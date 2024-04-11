var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Wordsearch = /** @class */ (function () {
    function Wordsearch(words, level) {
        this.difficulty = {
            easy: 12,
            medium: 16,
            hard: 20,
        };
        this.highlightedItems = [];
        this.letters = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];
        this.random = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        this.words = words;
        this.size = this.difficulty[level];
        this.unusedWords = [];
    }
    Wordsearch.prototype.makeGrid = function () {
        var _this = this;
        this.grid = Array.from(Array(this.size), function () {
            return new Array(_this.size).fill(null);
        });
        return this.grid;
    };
    Wordsearch.prototype.fillGrid = function () {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var gridCopy = this.grid.map(function (row) { return __spreadArray([], row, true); });
        for (var i = 0; i < gridCopy.length; i++) {
            var row = gridCopy[i];
            for (var j = 0; j < row.length; j++) {
                if (gridCopy[i][j] === null) {
                    gridCopy[i][j] = possible[this.random(0, possible.length - 1)];
                }
            }
        }
        this.grid = gridCopy;
        return this.grid;
    };
    Wordsearch.prototype.placeWords = function () {
        var highlightedItems = [];
        // Insert each word into the grid at a random location and orientation
        for (var _i = 0, _a = this.words; _i < _a.length; _i++) {
            var word = _a[_i];
            var wordLength = word.length;
            var maxIterations = 50;
            var iterations = 0;
            while (iterations < maxIterations) {
                var orientation_1 = Math.floor(Math.random() * 4); // 0 = horizontal, 1 = vertical, 2 = diagonal up, 3 = diagonal down
                var startRow = void 0, startCol = void 0, rowStep = void 0, colStep = void 0;
                if (orientation_1 === 0) {
                    // Horizontal
                    startRow = Math.floor(Math.random() * this.size);
                    startCol = Math.floor(Math.random() * (this.size - wordLength + 1));
                    rowStep = 0;
                    colStep = 1;
                }
                else if (orientation_1 === 1) {
                    // Vertical
                    startRow = Math.floor(Math.random() * (this.size - wordLength + 1));
                    startCol = Math.floor(Math.random() * this.size);
                    rowStep = 1;
                    colStep = 0;
                }
                else if (orientation_1 === 2) {
                    // Diagonal up
                    startRow = Math.floor(Math.random() * (this.size - wordLength + 1) + wordLength - 1);
                    startCol = Math.floor(Math.random() * (this.size - wordLength + 1));
                    rowStep = -1;
                    colStep = 1;
                }
                else {
                    // Diagonal down
                    startRow = Math.floor(Math.random() * (this.size - wordLength + 1));
                    startCol = Math.floor(Math.random() * (this.size - wordLength + 1));
                    rowStep = 1;
                    colStep = 1;
                }
                var validLocation = true;
                // Check if the word fits in the grid at the chosen location and orientation
                for (var i = 0; i < wordLength; i++) {
                    var row = startRow + i * rowStep;
                    var col = startCol + i * colStep;
                    if (this.grid[row][col] !== null && this.grid[row][col] !== word[i]) {
                        validLocation = false;
                        break;
                    }
                }
                // If the word fits, insert it into the grid and exit the loop
                if (validLocation) {
                    for (var i = 0; i < wordLength; i++) {
                        var rowIndex = startRow + i * rowStep;
                        var colIndex = startCol + i * colStep;
                        var letter = word[i].toUpperCase();
                        this.grid[rowIndex][colIndex] = letter;
                        this.highlightedItems.push(JSON.stringify({ rowIndex: rowIndex, colIndex: colIndex, letter: letter }));
                    }
                    break;
                }
                iterations++;
            }
        }
        return this.grid;
    };
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
    Wordsearch.prototype.showUnusedWords = function () {
        return this.unusedWords;
    };
    Wordsearch.prototype.showGrid = function () {
        return this.grid;
    };
    Wordsearch.prototype.showHighlightedWords = function () {
        return this.highlightedItems;
    };
    return Wordsearch;
}());
var words = ['apple', 'banana', 'cherry'];
function main() {
    var wordsearch = new Wordsearch(words, 'easy');
    console.log(wordsearch.makeGrid());
    wordsearch.validateWords();
    console.log('placed words is returning:', wordsearch.placeWords());
    console.log(wordsearch.showGrid());
    wordsearch.fillGrid();
    console.log('filled wordsearch is returning:', wordsearch.showGrid());
}
main();
