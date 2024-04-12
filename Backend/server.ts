import express = require('express');
const app = express();
import { Wordsearch } from './classes/wordsearch.class';
import dotenv = require('dotenv');
dotenv.config();

const words: string[] = ['Apple', 'banana', 'cherry'];
const level: string = 'easy';

const main = () => {
  const wordsearch = new Wordsearch(words, level);
  wordsearch.makeGrid();
  wordsearch.placeWords();
  wordsearch.fillGrid();
  wordsearch.showGrid;
};

main();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
