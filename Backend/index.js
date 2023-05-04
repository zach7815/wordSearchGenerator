import Express from 'express';
const app = Express();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import {
	validateAllWords,
	makeGrid,
	gridDifficulty,
} from './wordSearchGenerator.js';
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

	if (validateAllWords(wordsArray)) {
		console.log(makeGrid(gridDifficulty[difficulty]));
	}

	res.send('content received');
});

app.listen(port, () => {
	console.log(`app is listening on port:${port}`);
});
