import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { UserSubmission } from '../../Types/index.ts';
import { FormContainer } from './components/FormContainer.tsx';
import AppContext from './context/formContext.tsx';

function App() {
  const [userSubmission, setUserSubmission] = useState<UserSubmission>({
    authorName: '',
    header: '',
    title: '',
    difficulty: '',
    words: [],
  });

  function handleSave(submission: UserSubmission) {
    axios
      .post('http://localhost:8000/api/WordsearchData', { submission })

      .then((result) => console.log(result));
  }

  return (
    <div className="App">
      <div className="min-h-svh flex">
        <AppContext.Provider value={{ userSubmission, setUserSubmission }}>
          <div className="w-full flex items-center justify-center ">
            <FormContainer handleSave={handleSave} />
          </div>
        </AppContext.Provider>

        <div className="w-full flex items-center bg-black text-white justify-center  p-0 m-0">
          Shows options for wordsearch
        </div>
      </div>
    </div>
  );
}

export default App;
