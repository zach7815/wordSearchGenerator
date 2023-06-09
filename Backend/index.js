import Express from 'express';
const app = Express();
import fs from 'fs';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import ejs from 'ejs';
import { validationResult } from 'express-validator';
import pkg from 'lodash';
const { escape } = pkg;

import {
	validateAllWords,
	gridDifficulty,
	main,
} from './wordSearchGenerator.js';
import { htmlToPDF } from './pdfCreation.js';

const port = 3000;

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.post('/api/WordSearchData', jsonParser, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// Access the sanitized data
	const { authorName, header, title, difficulty, words } = req.body;
	const rawWordsArray = words.split(', ');
	const escapedUserDetails = [authorName, header, title, difficulty].map(
		(field) => escape(field),
	);
	const escapedWords = rawWordsArray.map((word) => escape(word));

	const gridDimensions = gridDifficulty[difficulty];

	if (validateAllWords(escapedWords)) {
		const wordsearchGrid = main(escapedWords, gridDimensions);
		const wordSearchTemplate = fs.readFileSync('./wordSearch.ejs', 'utf-8');
		const answersTemplate = fs.readFileSync('./answers.ejs', 'utf-8');
		const data = {
			authorName: escapedUserDetails[0],
			header: escapedUserDetails[1],
			title: escapedUserDetails[2],
			wordSearchData: wordsearchGrid.filledGrid,
			answers: wordsearchGrid.answers,
			words: escapedWords,
			level: escapedUserDetails[3],
		};
		const htmlWordSearch = ejs.render(wordSearchTemplate, data);
		const htmlAnswerGrid = ejs.render(answersTemplate, data);
		const wordSearchFileName = `${data.title}.html`;
		const answerSheetFileName = `${data.title}_answers.html`;
		try {
			fs.writeFileSync(
				`./htmlTemplates/${wordSearchFileName}`,
				htmlWordSearch,
				'utf8',
			);
			fs.writeFileSync(
				`./htmlTemplates/${answerSheetFileName}`,
				htmlAnswerGrid,
				'utf8',
			);
			htmlToPDF(`./htmlTemplates/${wordSearchFileName}`);
			htmlToPDF(`./htmlTemplates/${answerSheetFileName}`);
		} catch (error) {
			console.error;
		} finally {
			console.log('done');
		}
	} else {
		console.log('the words used are invalid');
	}

	res.end();
});

app.listen(port, () => {
	console.log(`app is listening on port:${port}`);
});
