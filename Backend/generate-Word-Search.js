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

const createGrid = (rows, columns) => {
	return Array(rows).fill(Array(columns).fill(''));
};

const generateRandomCoordinates = (rowLimit, columnLimit) => {
	const randomColCoordinate = Math.floor(Math.random() * columnLimit) + 0;
	const randomRowCoordinate = Math.floor(Math.random() * rowLimit) + 0;
	return [randomRowCoordinate, randomColCoordinate];
};

const checkPossibleDirections = (rows, columns, wordLength, coordinates) => {
	const possibleDirections = {
		horizontal: checkHorizontalSpace(columns, coordinates, wordLength),
		vertical: checkVerticalSpace(rows, coordinates, wordLength),
		diagonal: checkDiagonalSpace(rows, columns, coordinates, wordLength),
		mirrorDiagonal: checkMirrorDiagonal(rows, coordinates, wordLength),
	};
	return possibleDirections;
};

const confirmSomeDirectionsPossible = (directionsObject) => {
	return Object.values(directionsObject).every((value) => value === false);
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

const placeAllWords = (grid, wordObjects, coordinateLists) => {
	let updatedGrid = grid;
	for (let i = 0; i < wordObjects.length; i++) {
		updatedGrid = placeWord(updatedGrid, wordObjects[i], coordinateLists[i]);
	}
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

	const lettersOfWords = lettersOf(words);

	const testNumber = generateRandomCoordinates(rows, columns);

	const availableDirections = checkPossibleDirections(
		rows,
		columns,
		5,
		testNumber,
	);

	console.log(lettersOfWords);

	// const coordinateList = generateMapCoordinates([3, 4], 'horizontal', 4);
	// const coordinateList2 = generateMapCoordinates([0, 0], 'vertical', 6);

	// const updatedGrid = [
	// 	...placeWord(grid, lettersAndLength[0][`test`][`word`], coordinateList),
	// ];
	// const updatedGrid2 = placeWord(
	// 	updatedGrid,
	// 	lettersAndLength[1][`random`][`word`],
	// 	coordinateList2,
	// );
	// console.table(updatedGrid2);
};

main(exampleWords, gridDifficulty['easy']);
