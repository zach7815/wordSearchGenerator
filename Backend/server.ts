import express = require('express');
const app = express();
import fs from 'fs';
import { Wordsearch } from './classes/wordsearch.class';
import dotenv = require('dotenv');
dotenv.config();

const words: string[] = ['Apple', 'banana', 'cherry'];
const level: string = 'easy';

// const main = () => {
//   const wordsearch = new Wordsearch(['APPLE', 'chocolate', 'banana'], 'easy');
//   console.log(wordsearch.makeGrid());
//   wordsearch.validateWords();
//   console.log('placed words is returning:', wordsearch.placeWords());
//   wordsearch.fillGrid();
//   console.log(wordsearch.showGrid);
// };

app.post('/api/WordsearchData', (req, res) => {
  console.log(req.param);
  res.send('result received');
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
