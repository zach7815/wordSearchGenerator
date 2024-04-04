interface Difficulty {
  easy: [number, number];
  medium: [number, number];
  hard: [number, number];
}

class Wordsearch {
  private words: string[];
  private difficulty = {
    easy: [12, 12],
    medium: [18, 18],
    hard: [23, 23],
  };
  private grid: string[][];
  constructor(words: string[], size: string) {
    this.words = words;
    this.difficulty = this.difficulty[size];
  }

  makeGrid() {
    const dimensions = this.difficulty[0];
    this.grid = Array(dimensions).fill(Array(dimensions).fill(''));
    return this.grid;
  }

  random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  fillGrid() {
    const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const gridCopy = this.grid.map((row) => [...row]);

    for (let i = 0; i < gridCopy.length; i++) {
      let row = gridCopy[i];
      for (let j = 0; j < row.length; j++) {
        if (gridCopy[i][j] === '') {
          gridCopy[i][j] = possible[this.random(0, possible.length - 1)];
        }
      }
    }
    return gridCopy;
  }

  placeWords() {
    for (const word of this.words) {
      const wordLength = word.length;
      const maxIteration = 1000;
      let iteration = 0;
      const wordSizeLimit = this.difficulty[0];
      if (word > wordSizeLimit) {
      }
    }
  }

  validateWords() {
    const validWord = /^[A-Z]+$/i;
    this.words = this.words.map((word) => word.toLocaleUpperCase());

    this.words = this.words.filter((word) => {
      return validWord.test(word);
    });
  }

  showWords() {
    return this.words;
  }
}

const words = ['<>script</>eg1g', 'pe4t', 'arch', 'car'];

function main() {
  const wordsearch = new Wordsearch(words, 'easy');
  console.log(wordsearch.makeGrid());
  wordsearch.validateWords();
  console.log(wordsearch.showWords());
}

main();
