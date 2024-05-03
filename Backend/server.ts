import express = require('express');
const app = express();
import cors = require('cors');
import { UserSubmission } from '../Types/index';
import bodyParser = require('body-parser');
import * as ejs from 'ejs';
import * as pkg from 'lodash';
const { escape } = pkg;
import { Wordsearch } from './classes/wordsearch.class.js';
import dotenv = require('dotenv');
import { workerData } from 'worker_threads';

dotenv.config();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
  );
  next();
});

app.use(cors());

app.post('/api/WordsearchData', (req, res) => {
  const { submission }: { submission: UserSubmission } = req.body;
  const { authorName, header, title, difficulty, words } = submission;
  const removedNullsOrBlanks = words.filter((word) => word !== null || '');
  console.log(removedNullsOrBlanks);
  const escapedWords: string[] = removedNullsOrBlanks.map((word: string) =>
    escape(word)
  );
  const escapedUserDetails: string[] = [
    authorName,
    header,
    title,
    difficulty,
  ].map((info: string | null) => escape(info || ''));
  console.log(difficulty);

  const wordsearch = new Wordsearch(words, difficulty);
  wordsearch.makeGrid();
  const answers = wordsearch.placeWords();
  wordsearch.fillGrid();
  const finishedWordSearch = wordsearch.showGrid;

  const data = {
    authorName: escapedUserDetails[0],
    header: escapedUserDetails[1],
    title: escapedUserDetails[2],
    wordsearchData: finishedWordSearch,
    answers: answers,
    words: escapedWords,
    level: escapedUserDetails[3],
  };

      const htmlWordSearch = ejs.render(wordSearchTemplate, data);
      const htmlAnswerGrid = ejs.render(answersTemplate, data);
      const wordSearchFileName = `${data.title}.html`;
      const answerSheetFileName = `${data.title}_answers.html`;

  res.send('hello');
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
