import Express from 'express';
const app = Express();
import fs from 'fs';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import ejs from 'ejs';
import path from 'path';
import {
	validateAllWords,
	gridDifficulty,
	main,
} from './wordSearchGenerator.js';

import { htmlToPDF } from './pdfCreation.js';
import { log } from 'console';

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

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/api/WordSearchData', jsonParser, (req, res) => {
	const { authorName, header, title, difficulty, words } = req.body;
	const wordsArray = words.split(', ');
	const gridDimensions = gridDifficulty[difficulty];

	if (validateAllWords(wordsArray)) {
		const data = main(wordsArray, gridDimensions);
		const template = fs.readFileSync('./template.ejs', 'utf-8');

		const html = ejs.render(template, { data });
		// console.log(html);
		const fileName = `${title}.html`;
		try {
			fs.writeFileSync(`./htmlTemplates/${title}.html`, html, 'utf8');
		} catch (error) {
			console.error;
		} finally {
			console.log('done');
		}
	}

	res.send('content received');
});

app.listen(port, () => {
	console.log(`app is listening on port:${port}`);
});
