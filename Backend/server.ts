import express from 'express';
const app = express();
import cors from 'cors';
import { UserSubmission } from '../Types/index';
import bodyParser from 'body-parser';
import * as ejs from 'ejs';
import pkg from 'lodash';
const { escape } = pkg;
import { Wordsearch } from './classes/wordsearch.class.js';
import dotenv from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { htmlToPDF } from './pdfCreation.js';
import { log } from 'console';
import { mergePDFS } from './puppeteerFunctions/mergePDF.js';
import { emptyDirectory } from './utils/emptyDirectories.js';

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
  const escapedWords: string[] = removedNullsOrBlanks.map((word: string) =>
    escape(word)
  );
  const escapedUserDetails: string[] = [
    authorName,
    header,
    title,
    difficulty,
  ].map((info: string | null) => escape(info || ''));

  const wordsearch = new Wordsearch(escapedWords, difficulty);
  wordsearch.makeGrid();
  const answers = wordsearch.placeWords();
  wordsearch.fillGrid();
  const finishedWordSearch = wordsearch.showGrid;

  const data = {
    authorName: escapedUserDetails[0],
    header: escapedUserDetails[1],
    title: escapedUserDetails[2],
    wordSearchData: finishedWordSearch,
    answers: answers,
    words: escapedWords,
    level: escapedUserDetails[3],
  };
  console.log(data.title);

  const wordSearchTemplate = readFileSync('./views/wordsearch.ejs', 'utf-8');
  const answersTemplate = readFileSync('./views/answers.ejs', 'utf-8');
  const htmlWordSearch = ejs.render(wordSearchTemplate, data);
  const htmlAnswerGrid = ejs.render(answersTemplate, data);
  const wordSearchFileName = `${data.title}.html`;
  const answerSheetFileName = `${data.title}_answers.html`;

  try {
    writeFileSync(
      `./html-templates/${wordSearchFileName}`,
      htmlWordSearch,
      'utf8'
    );
    writeFileSync(
      `./html-templates/${answerSheetFileName}`,
      htmlAnswerGrid,
      'utf8'
    );
    (async function convertToPDF() {
      await htmlToPDF(`./html-templates/${wordSearchFileName}`, title);
      await htmlToPDF(
        `./html-templates/${answerSheetFileName}`,
        title + 'answers'
      );
    })()
      .then(async () => {
        await mergePDFS(
          `./pdfOutput/${title}.pdf`,
          `./pdfOutput/${title}answers.pdf`
        );
      })
      .then(() => {
        emptyDirectory('./html-templates');
        emptyDirectory('./pdfOutput');
      });
  } catch (error) {
    console.log(error);
  } finally {
  }

  res.send('hello');
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
