import { WordSearchData } from '../../../Types/index.js';

interface DownloadButtonProps {
  downloadURL: string;
  wordSearchData: WordSearchData[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloadURL,
  wordSearchData,
}) => {
  function downloadPDF() {
    const firstDataEntry = Object.values(wordSearchData[0])[0];
    const { title } = firstDataEntry;

    console.log(title);

    const link = document.createElement('a');
    link.href = downloadURL;
    link.setAttribute(
      'download',
      `${title + '_wordsearch' || 'wordsearch'}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-fit w-fit"
      onClick={downloadPDF}
    >
      Download Wordsearch
    </button>
  );
};

export default DownloadButton;
