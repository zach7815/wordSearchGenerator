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

export const generateGrid = function (difficulty) {
	return Array(difficulty.height).fill(Array(difficulty.width).fill(''));
};

const easyGrid = generateGrid(gridDifficulty.easy);
console.log(easyGrid);
