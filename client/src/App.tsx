import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Form } from './components/form';
import { UserSubmission } from '../../Types/index.ts';

function App() {
  const [userSubmission, setUserSubmission] = useState<UserSubmission>({
    authorName: '',
    header: '',
    title: '',
    difficulty: '',
    words: [],
  });

  function handleSave(submission: UserSubmission) {
    console.log(typeof submission);
    axios
      .post('http://localhost:8000/api/WordsearchData', { submission })

      .then((result) => console.log(result));
  }

  return (
    <>
      <div className="App">
        <div className="formContainer">
          <Form
            handleSave={handleSave}
            setUserSubmission={setUserSubmission}
            userSubmission={userSubmission}
          />
        </div>
      </div>
    </>
  );
}

export default App;
