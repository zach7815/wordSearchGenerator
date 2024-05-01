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
      <div className="main-container">
        <AppContext.Provider value={{  userSubmission, setUserSubmission }}>
          <div className="form-container">
            <FormContainer handleSave={handleSave} />
          </div>
        </AppContext.Provider>

        <div className="example-container">Shows options for wordsearch</div>
      </div>
    </div>
  );
}

export default App;
