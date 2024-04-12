"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var wordsearch_class_1 = require("./classes/wordsearch.class");
var dotenv = require("dotenv");
dotenv.config();
var words = ['Apple', 'banana', 'cherry'];
var level = 'easy';
// const main = () => {
//   const wordsearch = new Wordsearch(['APPLE', 'chocolate', 'banana'], 'easy');
//   console.log(wordsearch.makeGrid());
//   wordsearch.validateWords();
//   console.log('placed words is returning:', wordsearch.placeWords());
//   wordsearch.fillGrid();
//   console.log(wordsearch.showGrid);
// };
var main = function () {
    var wordsearch = new wordsearch_class_1.Wordsearch(words, level);
    wordsearch.makeGrid();
    wordsearch.placeWords();
    wordsearch.fillGrid();
    wordsearch.showGrid;
};
main();
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, function () {
    console.log("App is listening on port ".concat(PORT));
});
