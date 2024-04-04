var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var difficulties = {
    easy: [12, 12],
    medium: [18, 18],
    hard: [23, 23],
};
var Wordsearch = /** @class */ (function () {
    function Wordsearch(words, difficulty, grid) {
        this.random = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        this.words = words;
        this.difficulty = difficulty;
        this.grid = grid;
    }
    Wordsearch.prototype.generate = function () {
        var dimensions = this.difficulty.easy;
        var numRows = dimensions[0];
        var numCols = dimensions[1];
        this.grid = Array(numRows).fill(Array(numCols).fill(''));
        return this.grid;
    };
    Wordsearch.prototype.fillGrid = function () {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var gridCopy = this.grid.map(function (row) { return __spreadArray([], row, true); });
        for (var i = 0; i < gridCopy.length; i++) {
            var row = gridCopy[i];
            for (var j = 0; j < row.length; j++) {
                if (gridCopy[i][j] === '') {
                    gridCopy[i][j] = possible[this.random(0, possible.length - 1)];
                }
            }
        }
        return gridCopy;
    };
    Wordsearch.prototype.placeWords = function () { };
    Wordsearch.prototype.validateWords = function () {
        var validWord = /^[A-Z]+$/i;
        this.words = this.words.map(function (word) { return word.toLocaleUpperCase(); });
        this.words = this.words.filter(function (word) {
            return validWord.test(word);
        });
    };
    Wordsearch.prototype.showWords = function () {
        return this.words;
    };
    return Wordsearch;
}());
var words = ['<>script</>eg1g', 'pe4t', 'arch', 'car'];
var wordsearch = new Wordsearch(words, difficulties, []);
console.log(wordsearch.generate());
wordsearch.validateWords();
console.log(wordsearch.showWords());
