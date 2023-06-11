const exampleWords = [`test`, `random`, `word`, `challenge`];

const validWord = /^[a-zA-Z]+$/i;
export const validateAllWords = (wordsArray) => {
	return wordsArray.every((word) => validWord.test(word));
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

const createGrid = (rows, columns) => {
	return Array(rows).fill(Array(columns).fill(''));
};

const generateRandomCoordinates = (rowLimit, columnLimit) => {
	const randomColCoordinate = Math.floor(Math.random() * columnLimit) + 0;
	const randomRowCoordinate = Math.floor(Math.random() * rowLimit) + 0;
	return [randomRowCoordinate, randomColCoordinate];
};

const checkPossibleDirections = (rows, columns, wordLength, coordinates) => {
	console.log(coordinates);
	const possibleDirections = {
		horizontal: checkHorizontalSpace(columns, coordinates, wordLength),
		vertical: checkVerticalSpace(rows, coordinates, wordLength),
		diagonal: checkDiagonalSpace(rows, columns, coordinates, wordLength),
		mirrorDiagonal: checkMirrorDiagonal(rows, coordinates, wordLength),
	};
	return possibleDirections;
};

const checkHorizontalSpace = (columnLimit, coordinates, wordLength) => {
	const spaceAvailable = columnLimit - coordinates[1] + 1;
	if (spaceAvailable >= wordLength) {
		return true;
	}
	return false;
};

const checkVerticalSpace = (rowLimit, coordinates, wordLength) => {
	const spaceAvailable = rowLimit - coordinates[0] + 1;
	if (spaceAvailable >= wordLength) {
		return true;
	}
	return false;
};

const checkDiagonalSpace = (rowLimit, columnLimit, coordinates, wordLength) => {
	const spacesAvailable = [
		rowLimit - coordinates[0] + 1,
		columnLimit - coordinates[1] + 1,
	];
	if (spacesAvailable[0] >= wordLength && spacesAvailable[1] >= wordLength) {
		return true;
	}

	return false;
};

const checkMirrorDiagonal = (rowLimit, coordinates, wordLength) => {
	const horizontalSpaceAvailable = rowLimit - coordinates[0] + 1;
	if (horizontalSpaceAvailable >= wordLength && coordinates[1] >= wordLength) {
		return true;
	}
	return false;
};

const makeLettersOf = (words) => {
	const mappedArray = words.map((word) => ({
		[word]: {
			word: word.split(''),
			length: word.length,
		},
	}));

	const result = Object.assign({}, ...mappedArray);
	return result;
};

const longestWord = (words) => {
	return Math.max(...words.map((word) => word.length));
};

const countWordChar = (words) => {
	let letterCount = {};
	return words.map((word) => (letterCount.word = { length: word.length }));
};

const main = (words, gridSize) => {
	const { rows, columns } = gridSize;

	if (!validateAllWords(exampleWords)) {
		console.log(exampleWords.filter((word) => word.match(validWord)));
	}
	const grid = createGrid(rows, columns);
	const letterCount = countWordChar(words);
	const letters = makeLettersOf(words);

	const testNumber = generateRandomCoordinates(rows, columns);

	const availableDirections = checkPossibleDirections(
		rows,
		columns,
		4,
		testNumber,
	);

	console.log(availableDirections);
};

main(exampleWords, gridDifficulty['easy']);
