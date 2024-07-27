import { useEffect } from 'react';

const LivePreview = ({ wordsearchData }) => {
  useEffect(() => {
    console.log(wordsearchData);
    const firstDataEntry = Object.values(wordsearchData[0])[0];
    console.log(firstDataEntry);
    const { wordSearchData, words, Answers, level } = firstDataEntry;
    const flatArray = wordSearchData.flat();

    function makeWordTable(words: string[]) {
      const wordSearchContainer = document.querySelector(
        '.wordsearchContainer'
      );
      if (wordSearchContainer) {
        const existingTable = wordSearchContainer.querySelector('table');
        if (existingTable) {
          wordSearchContainer.removeChild(existingTable);
        }

        const wordsTable = document.createElement('table');
        wordsTable.classList.add('text-black');
        const tableFirstRow = document.createElement('tr');
        const tableHeading = document.createElement('th');
        wordsTable.appendChild(tableFirstRow);
        tableFirstRow.appendChild(tableHeading);
        tableHeading.setAttribute('colspan', '5');
        tableHeading.innerText = 'Can you find the words above?';

        for (let i = 0; i < 5; i++) {
          const tablerow = document.createElement('tr');
          wordsTable.appendChild(tablerow);
          for (let j = 0; j < 5; j++) {
            const tableCell = document.createElement('td');
            tableCell.textContent = words[i * 5 + j] || '';
            tablerow.appendChild(tableCell);
            tableCell.classList.add('text-black');
          }
        }

        const exampleContainer = document.querySelector('.exampleContainer');
        if (exampleContainer) {
          exampleContainer.classList.add('flex-col');
        }
        wordSearchContainer.appendChild(wordsTable);
      }
    }

    function makeGrid(size: number) {
      const wordSearchContainer = document.querySelector('.wordsearch');
      wordSearchContainer.innerHTML = '';

      for (let row = 0; row < size; row++) {
        const divRow = document.createElement('div');
        divRow.dataset.row = `row-${String(row)}`;
        divRow.className = 'flex border w-fit h-fit';

        for (let col = 0; col < size; col++) {
          const Cell = document.createElement('span');
          Cell.id = `cell-${col + row * size}`;
          Cell.className =
            'bg-white  border text-black text-base  inline-flex justify-center items-center h-[2rem] w-[2rem]';
          Cell.innerText = flatArray[col + row * size];
          divRow.appendChild(Cell);
        }

        wordSearchContainer.appendChild(divRow);
      }
    }

    makeGrid(10);
    makeWordTable(words);
  });

  return (
    <div className=" wordsearchContainer  w-full flex items-center text-white justify-center  p-0 m-0 flex-col">
      <div className="wordsearch border border-solid border-black"></div>
    </div>
  );
};

export default LivePreview;
