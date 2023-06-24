import {
	checkPossibleDirections,
	confirmSomeDirectionsPossible,
	chooseDirection,
} from './check-direction-functions.js';

const exampleWords = [`test`, `random`, `word`, `challenge`];

export const validateAllWords = (wordsArray) => {
	const validWord = /^[a-zA-Z]+$/i;
	return wordsArray.every((word) => validWord.test(word));
};

const removeInvalidWords = (wordsArray) => {
	const validWord = /^[a-zA-Z]+$/i;
	return wordsArray.filter((word) => word.match(validWord));
};

export const gridDifficulty = {
	easy: {
		rows: 12,
		columns: 8,
	},
	intermediate: {
		rows: 18,
		columns: 12,
	},
	advanced: {
		rows: 23,
		columns: 16,
	},
};

const wordSearch = [
	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],

	['', '', '', '', '', '', '', ''],
];

const createGrid = (rows, columns) => {
	return Array(rows).fill(Array(columns).fill(''));
};

const generateRandomCoordinates = (rowLimit, columnLimit) => {
	const randomColCoordinate = Math.floor(Math.random() * columnLimit) + 0;
	const randomRowCoordinate = Math.floor(Math.random() * rowLimit) + 0;
	return [randomRowCoordinate, randomColCoordinate];
};

const validDirections = (rawDirectionsObject) => {
	return Object.entries(rawDirectionsObject).reduce((acc, [key, value]) => {
		if (value === true) {
			acc[key] = value;
		}
		return acc;
	}, {});
};

const storeLettersAndLength = (words) => {
	const mappedArray = words.map((word) => ({
		[word]: {
			word: word.split(''),
			length: word.length,
		},
	}));

	const result = [...mappedArray];
	return result;
};

const lettersOf = (words) => {
	const splitWords = [];
	words.forEach((word) => {
		const splitWord = word.split('');
		splitWords.push(splitWord);
	});
	return splitWords;
};

const longestWord = (words) => {
	return Math.max(...words.map((word) => word.length));
};

const generateMapCoordinates = (startingCoordinate, direction, wordLength) => {
	const [row, column] = startingCoordinate;
	const mappedCoordinates = [startingCoordinate];
	switch (direction) {
		case 'horizontal':
			for (let i = 1; i < wordLength; i++) {
				mappedCoordinates.push([row, column + i]);
			}
			break;

		case 'vertical':
			for (let i = 1; i < wordLength; i++) {
				mappedCoordinates.push([row + i, column]);
			}
			break;
		case 'diagonal':
			for (let i = 1; i < wordLength; i++) {
				mappedCoordinates.push([row + i, column + i]);
			}
			break;
		case 'mirrorDiagonal':
			for (let i = 1; i < wordLength; i++) {
				mappedCoordinates.push([row - i, column - i]);
			}
			break;
	}

	return mappedCoordinates;
};

const placeWord = (grid, wordObject, coordinates) => {
	let index = 0;
	const newGrid = grid.map((row) => [...row]); // Create a new grid with cloned subarrays

	for (const coordinate of coordinates) {
		const [row, column] = coordinate;
		newGrid[row][column] = wordObject[index];
		index++;
	}

	return newGrid;
};

const generateCoordinateList = (wordLetters, rows, columns) => {
	let noDirectionPossible = true;
	let availableDirections;

	do {
		const startCoordinates = generateRandomCoordinates(rows, columns);
		availableDirections = checkPossibleDirections(
			rows,
			columns,
			wordLetters.length,
			startCoordinates,
		);
		noDirectionPossible = confirmSomeDirectionsPossible(availableDirections);
	} while (noDirectionPossible);

	const possibleDirections = validDirections(availableDirections);

	return { Word: wordLetters, directions: possibleDirections };
};

const createWordSearch = (grid, lettersOf, rows, columns) => {
	const maxTries = rows * columns * (rows * columns);
	const unplacedWords = [];

	for (let i = 0; i < lettersOf.length; i++) {
		let startCoordinates = generateRandomCoordinates(rows, columns);
		let possibleDirections = checkPossibleDirections(
			rows,
			columns,
			lettersOf[i].length,
			startCoordinates,
		);
		let choosenDirection = chooseDirection(possibleDirections);
		console.log(choosenDirection);
	}
};

const updateDirectionRecords = (placedWords, direction) => {
	return placedWords[directions] + 1;
};

const checkConflict = (wordSearch, coordinateList) => {
	for (let coordinate of coordinateList) {
		if (wordSearch[coordinate[0]][coordinate[1]] !== '') {
			return false;
		}
	}
	return true;
};

const main = (words, gridSize) => {
	const { rows, columns } = gridSize;

	const placedWords = {
		horizontal: 0,
		vertical: 0,
		diagonal: 0,
		mirrorDiagonal: 0,
	};

	const grid = createGrid(rows, columns);
	const chosenDirection = chooseDirection(
		{
			horizontal: 3,
			vertical: 2,
			diagonal: 4,
			mirrorDiagonal: 0,
		},
		{
			horizontal: true,
			vertical: true,
			diagonal: true,
		},
	);

	console.log(chosenDirection);

	// const lettersOfWords = lettersOf(words);
	// const wordSearchGrid = createWordSearch(
	// 	wordSearch,
	// 	lettersOfWords,
	// 	rows,
	// 	columns,
	// );

	// console.log(wordSearchGrid);
};

main(exampleWords, gridDifficulty['easy']);
