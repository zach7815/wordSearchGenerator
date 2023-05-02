import Express from 'express';
const app = Express();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
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
	console.log(req.body);
	res.send('content received');
});

app.listen(port, () => {
	console.log(`app is listening on port:${port}`);
});
