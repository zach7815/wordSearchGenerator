import { WordSearchData } from '../../../Types/index.js';

interface DownloadButtonProps {
  downloadURL: string | undefined;
  wordSearchData: WordSearchData[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloadURL,
  wordSearchData,
}) => {
  function downloadPDF() {
    const firstDataEntry = Object.values(wordSearchData[0])[0];
    const { title } = firstDataEntry;

    const link = document.createElement('a');
    if (typeof downloadURL === 'string') {
      link.href = downloadURL;
      link.setAttribute(
        'download',
        `${title + '_wordsearch' || 'wordsearch'}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      throw new Error(
        ` Error! The download url is a type of${typeof downloadURL}, download button attribute is expecting to receive a string`
      );
    }
  }

  return (
    <div className="flex justify-between">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-fit w-fit"
        onClick={downloadPDF}
      >
        Download Wordsearch
      </button>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-fit w-fit"
      >
        Create Another wordsearch
      </button>
    </div>
  );
};

export default DownloadButton;
