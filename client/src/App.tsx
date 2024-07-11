import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { UserSubmission } from '../../Types/index.ts';
import { FormContainer } from './components/form components/FormContainer.tsx';
import AppContext from './context/formContext.tsx';
import ExampleWordsearchCarousel from './components/swiper.tsx';
import { WordSearchData } from '../../Types/index';
import DownloadButton from './components/downloadPDF.tsx';

function App() {
  const [userSubmission, setUserSubmission] = useState<UserSubmission>({
    authorName: '',
    header: '',
    title: '',
    difficulty: '',
    words: [],
  });
  const [wordLimit, setWordLimit] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [wordSearchData, setWordSearchData] = useState<WordSearchData[]>([]);
  const [downloadReady, setDownloadReady] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>();

  function handleSave(submission: UserSubmission) {
    axios
      .post('http://localhost:8000/api/WordsearchData', { submission })
      .then((response) => {
        const { data } = response.data;
        const { data: wordSearchData } = data;

        const dataUrl = data.dataURL;
        console.log(wordSearchData);

        // Create a Blob object from the data URL
        const binaryData = atob(dataUrl.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        setWordSearchData([
          {
            ...wordSearchData,
          },
        ]);
        console.log('wordSearch Data just set', wordSearchData[0].title);
        const file = new Blob([uint8Array], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(file);
        setDownloadURL(url);
        setDownloadReady(true);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }

  return (
    <div className="App overflow-hidden h-screen">
      <div className="min-h-svh flex">
        <AppContext.Provider
          value={{
            userSubmission,
            setUserSubmission,
            wordLimit,
            setWordLimit,
            message,
            setMessage,
          }}
        >
          <div className="w-full flex items-center  flex-col content-between justify-center overflow-hidden">
            <div className="grid h-full overflow-hidden">
              <h1 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mb-2 mt-6 relative capitalize ">
                Create your own wordsearch worksheet
              </h1>
              {downloadReady === false ? (
                <FormContainer handleSave={handleSave} />
              ) : (
                <DownloadButton
                  downloadURL={downloadURL}
                  wordSearchData={wordSearchData}
                />
              )}
            </div>
          </div>
        </AppContext.Provider>

        <div className="w-full flex items-center  justify-center  p-0 m-0 overflow-auto exampleContainer">
          <ExampleWordsearchCarousel />
        </div>
      </div>
    </div>
  );
}

export default App;
