import { gridDifficulty, generateGrid, validateAllWords } from './index.js';

const validTestWords = ['reddit', 'cream', 'apple', 'banana', 'chicken'];
const invalidTestWords = ['red2it', 'cr3am', 'apple', 'ban5na', 'chicken'];

const easyArray = [
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

test('expected true', () => {
	expect(validateAllWords(validTestWords)).toBe(true);
});
test('expected true', () => {
	expect(validateAllWords(invalidTestWords)).toBe(false);
});

const easyGrid = generateGrid(gridDifficulty.easy);
test('easy Array size', () => {
	expect(easyGrid).toMatchObject(easyArray);
});
