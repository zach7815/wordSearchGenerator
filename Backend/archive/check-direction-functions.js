export const checkPossibleDirections = (
	rows,
	columns,
	wordLength,
	coordinates,
) => {
	const possibleDirections = {
		horizontal: checkHorizontalSpace(columns, coordinates, wordLength),
		vertical: checkVerticalSpace(rows, coordinates, wordLength),
		diagonal: checkDiagonalSpace(rows, columns, coordinates, wordLength),
		mirrorDiagonal: checkMirrorDiagonal(rows, coordinates, wordLength),
	};
	return possibleDirections;
};

export const confirmSomeDirectionsPossible = (directionsObject) => {
	return Object.values(directionsObject).every((value) => value === false);
};

const checkHorizontalSpace = (columnLimit, coordinates, wordLength) => {
	const spaceAvailable = columnLimit - coordinates[1] + 1;
	return spaceAvailable >= wordLength;
};

const checkVerticalSpace = (rowLimit, coordinates, wordLength) => {
	const spaceAvailable = rowLimit - coordinates[0] + 1;
	return spaceAvailable >= wordLength;
};

const checkDiagonalSpace = (rowLimit, columnLimit, coordinates, wordLength) => {
	const spacesAvailable = [
		rowLimit - coordinates[0] + 1,
		columnLimit - coordinates[1] + 1,
	];
	return !!(
		spacesAvailable[0] >= wordLength && spacesAvailable[1] >= wordLength
	);
};

const checkMirrorDiagonal = (rowLimit, coordinates, wordLength) => {
	const horizontalSpaceAvailable = rowLimit - coordinates[0] + 1;
	return !!(
		horizontalSpaceAvailable >= wordLength && coordinates[1] >= wordLength
	);
};

export const chooseDirection = (placedWords, possibleDirections) => {
	const placedWordKeys = Object.keys(placedWords);
	const possibleDirectionKeys = Object.keys(possibleDirections);

	const availableDirections = placedWordKeys.filter((word) =>
		possibleDirectionKeys.includes(word),
	);

	const smallestValueKey = availableDirections.reduce((minKey, direction) => {
		if (placedWords[direction] < placedWords[minKey]) {
			return direction;
		} else {
			return minKey;
		}
	}, availableDirections[0]);

	return smallestValueKey;
};
