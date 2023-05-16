const validWord = /^[a-zA-Z]+$/i;
export const validateAllWords = (wordsArray) => {
	return wordsArray.every((word) => validWord.test(word));
};

export const gridDifficulty = {
	easy: {
		height: 12,
		width: 8,
	},
	intermediate: {
		height: 18,
		width: 12,
	},
	advanced: {
		height: 23,
		width: 16,
	},
};

export const makeGrid = (difficulty) => {
	const { height, width } = difficulty;
	const grid = [];
	for (let i = 0; i < height; i++) {
		grid[i] = [];
		for (let j = 0; j < width; j++) {
			grid[i][j] = '';
		}
	}
	return grid;
};

const makeLettersOf = (words) => {
	const lettersOf = words.reduce((lettersOf, word) => {
		lettersOf[word] = Array.from(word);
		return lettersOf;
	}, {});
	return lettersOf;
};

// access result with either Object.keys, entries or values

// placement Functions

const horizontal = ([row, col], i) => [row + 0, col + i];
const vertical = ([row, col], i) => [row + i, col + 0];
const diagonal = ([row, col], i) => [row + i, col + i];
const mirrorDiagonal = ([row, col], i) => [row + 0, col - i];

// Fitment functions- determines if words will fit into the grid

const fitsHorizontal = (gridSize, startColumn, wordLength) =>
	gridSize - startColumn > wordLength;

const fitsVertical = (gridSize, startRow, wordLength) =>
	gridSize - startRow > wordLength;

const fitsDiagonal = (gridSize, startRow, startColumn, wordLength) =>
	fitsHorizontal(gridSize, startColumn, wordLength) &&
	fitsVertical(gridSize, startRow, wordLength);

const fitsMirrorDiagonal = (gridSize, startRow, startColumn, wordLength) =>
	fitsVertical(gridSize, startRow, wordLength) && startColumn - wordLength > 0;

//  Check if a letter can exist in a position
const letterCanExistAtPosition = (grid, position, letter) => {
	const [row, col] = position;
	const canExist = new RegExp(`${letter}?$`).test(grid[row][col]);
	return canExist;
};

// this is Where we will need to control if the letters will be uppercase or not.

const insertWordIntoGrid = (grid, positions, word, lettersOf = []) => {
	const letters = lettersOf[word];
	console.log(letters);
	// console.log(`letters Of= ${lettersOf.test}`);

	letters.forEach((letter, i) => {
		const [row, col] = positions[i];

		grid[row][col] = letter.toUpperCase();
	});
};

const mapPositionsForWord = (
	grid,
	gridSize,
	startPosition,
	word,
	lettersOf,
) => {
	const [row, col] = startPosition;

	const indexToPosition =
		(fitsHorizontal(gridSize, col, word.length) && horizontal) ||
		(fitsVertical(gridSize, row, word.length) && vertical) ||
		(fitsDiagonal(gridSize, row, col, word.length) && diagonal) ||
		(fitsMirrorDiagonal(gridSize, row, col, word.length) && mirrorDiagonal);

	if (typeof indexToPosition === 'function') {
		const letters = lettersOf[word];
		const positions = letters.reduce((positions, letter, i) => {
			if (positions) {
				const position = indexToPosition(startPosition, i);
				if (letterCanExistAtPosition(grid, position, letter)) {
					return positions.concat([position]);
				}
			}
			return false;
		}, []);
		return positions;
	}
	return false;
};

// calculate random int;

const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const placeWords = (grid, gridSize, words, lettersOf) => {
	const maxAttempts = gridSize * gridSize;

	for (const word of words) {
		let attempts = 0;

		while (attempts < maxAttempts) {
			const row = random(0, gridSize - 1);
			const col = random(0, gridSize - 1);
			const startPosition = [row, col];

			const positions = mapPositionsForWord(
				grid,
				gridSize,
				startPosition,
				word,
				lettersOf,
			);
			if (positions) {
				insertWordIntoGrid(grid, positions, word, lettersOf);
				break;
			}
			attempts++;
		}
		if (attempts === maxAttempts) {
			return false;
		}
	}
	return grid;
};

const fillGrid = (grid, width) => {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const filledGrid = [];

	for (let i = 0; i < grid.length; i++) {
		const row = [];
		for (let j = 0; j < width; j++) {
			if (grid[i][j] === '' || grid[i][j] === undefined) {
				row.push(possible[random(0, possible.length - 1)]);
			} else {
				row.push(grid[i][j]);
			}
		}
		// fill the row to the desired width if it is too short
		if (row.length < width) {
			row.push(
				...Array(width - row.length).fill(
					possible[random(0, possible.length - 1)],
				),
			);
		}
		filledGrid.push(row);
	}

	// add new rows to the grid if it is too short
	if (filledGrid.length < width) {
		filledGrid.push(
			...Array(width - filledGrid.length).fill(
				Array(width).fill(possible[random(0, possible.length - 1)]),
			),
		);
	}

	return filledGrid;
};

export const main = (wordsArray, gridSize) => {
	const lettersOf = makeLettersOf(wordsArray);

	let grid = [];
	let result = false;
	do {
		grid = makeGrid(gridSize);

		result = placeWords(grid, gridSize.height, wordsArray, lettersOf);
		gridSize++;
	} while (!result);
	console.log(result);
	return result;
	// const filledGrid = fillGrid(grid, 12);

	// return filledGrid;
};
