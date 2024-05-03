"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const pkg = __importStar(require("lodash"));
const { escape } = pkg;
const wordsearch_class_js_1 = require("./classes/wordsearch.class.js");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'append,delete,entries,foreach,get,has,keys,set,values,Authorization');
    next();
});
app.use(cors());
app.post('/api/WordsearchData', (req, res) => {
    const { submission } = req.body;
    const { authorName, header, title, difficulty, words } = submission;
    const removedNullsOrBlanks = words.filter((word) => word !== null || '');
    console.log(removedNullsOrBlanks);
    const escapedWords = removedNullsOrBlanks.map((word) => escape(word));
    const escapedUserDetails = [
        authorName,
        header,
        title,
        difficulty,
    ].map((info) => escape(info || ''));
    console.log(difficulty);
    const wordsearch = new wordsearch_class_js_1.Wordsearch(words, difficulty);
    wordsearch.makeGrid();
    wordsearch.placeWords();
    wordsearch.fillGrid();
    const finishedWordSearch = wordsearch.showGrid;
    console.log(finishedWordSearch);
    res.send('hello');
});
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
