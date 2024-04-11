function generateGrid(
  size,
  words,
  letters,
  setErrorMessage,
  setSizeError,
  setHighlighted,
  setGrid
) {
  const grid = Array.from(Array(size), () => new Array(size).fill(null));
  const highlightedItems = [];

  // Insert each word into the grid at a random location and orientation
  for (const word of words) {
    const wordLength = word.length;
    const maxIterations = 50;
    let iterations = 0;
    while (iterations < maxIterations) {
      const orientation = Math.floor(Math.random() * 4); // 0 = horizontal, 1 = vertical, 2 = diagonal up, 3 = diagonal down
      let startRow, startCol, rowStep, colStep;

      if (orientation === 0) {
        // Horizontal
        startRow = Math.floor(Math.random() * size);
        startCol = Math.floor(Math.random() * (size - wordLength + 1));
        rowStep = 0;
        colStep = 1;
      } else if (orientation === 1) {
        // Vertical
        startRow = Math.floor(Math.random() * (size - wordLength + 1));
        startCol = Math.floor(Math.random() * size);
        rowStep = 1;
        colStep = 0;
      } else if (orientation === 2) {
        // Diagonal up
        startRow = Math.floor(
          Math.random() * (size - wordLength + 1) + wordLength - 1
        );
        startCol = Math.floor(Math.random() * (size - wordLength + 1));
        rowStep = -1;
        colStep = 1;
      } else {
        // Diagonal down
        startRow = Math.floor(Math.random() * (size - wordLength + 1));
        startCol = Math.floor(Math.random() * (size - wordLength + 1));
        rowStep = 1;
        colStep = 1;
      }

      let validLocation = true;

      // Check if the word fits in the grid at the chosen location and orientation
      for (let i = 0; i < wordLength; i++) {
        const row = startRow + i * rowStep;
        const col = startCol + i * colStep;

        if (grid[row][col] !== null && grid[row][col] !== word[i]) {
          validLocation = false;
          break;
        }
      }

      // If the word fits, insert it into the grid and exit the loop
      if (validLocation) {
        for (let i = 0; i < wordLength; i++) {
          const rowIndex = startRow + i * rowStep;
          const colIndex = startCol + i * colStep;
          const letter = word[i].toUpperCase();
          grid[rowIndex][colIndex] = letter;
          highlightedItems.push(JSON.stringify({ rowIndex, colIndex, letter }));
        }
        break;
      }
      iterations++;
    }
  }

  // Fill the empty spaces with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] == null) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  setHighlighted(highlightedItems);
  setGrid(grid);
}

const sizeValue = 10;
const wordsArray = ['apple', 'banana', 'cherry'];
const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// Example implementations of the set functions (replace them with your own implementation)
function setErrorMessageFunction(message) {
  console.log('setErrorMessage:', message);
}

function setSizeErrorFunction(error) {
  console.log('setSizeError:', error);
}

function setHighlightedFunction(items) {
  // console.log('setHighlighted:', items);
}

function setGridFunction(grid) {
  console.log('setGrid:', grid);
}

// Call the generateGrid function
const wordSearch = generateGrid(
  sizeValue,
  wordsArray,
  lettersArray,
  setErrorMessageFunction,
  setSizeErrorFunction,
  setHighlightedFunction,
  setGridFunction
);

console.log(wordSearch);
