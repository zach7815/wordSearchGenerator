"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var pkg = require("lodash");
var escape = pkg.escape;
var dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'append,delete,entries,foreach,get,has,keys,set,values,Authorization');
    next();
});
app.use(cors());
app.post('/api/WordsearchData', function (req, res) {
    var submission = req.body.submission;
    var authorName = submission.authorName, header = submission.header, title = submission.title, difficulty = submission.difficulty, words = submission.words;
    var escapedWords = words.map(function (word) { return escape(word); });
    console.log(escapedWords);
    var escapedUserDetails = [
        authorName,
        header,
        title,
        difficulty,
    ].map(function (info) { return escape(info); });
    console.log(escapedUserDetails);
    // const wordsearch = new Wordsearch(words, difficulty);
    // wordsearch.makeGrid();
    // wordsearch.placeWords();
    // wordsearch.fillGrid();
    // const finishedWordSearch = wordsearch.showGrid;
    res.send('hello');
});
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, function () {
    console.log("App is listening on port ".concat(PORT));
});
