import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { UserSubmission } from '../../Types/index.ts';
import { FormContainer } from './components/form components/FormContainer.tsx';
import AppContext from './context/formContext.tsx';
import ExampleWordsearchCarousel from './components/swiper.tsx';

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

  function handleSave(submission: UserSubmission) {
    axios
      .post('http://localhost:8000/api/WordsearchData', { submission })

      .then((result) => console.log(result));
  }

  return (
    <div className="App">
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
          <div className="w-full flex items-center  flex-col content-between justify-center">
              <h1 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mb-2 mt-6 relative ">
                Create your own wordsearch worksheet
              </h1>
              <FormContainer handleSave={handleSave} />

          </div>
        </AppContext.Provider>

        <div className="w-full flex items-center  justify-center  p-0 m-0 overflow-auto">
          <ExampleWordsearchCarousel />
        </div>
      </div>
    </div>
  );
}

export default App;
