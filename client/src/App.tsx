import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Form } from './components/form';
import { UserSubmission } from './interfaces/formInterfaces';

const initialUserSubmission: UserSubmission = {
  authorName: '',
  header: '',
  title: '',
  difficulty: '',
  words: [],
};
function App() {
  const [userSubmission, setUserSubmission] = useState<UserSubmission>(
    initialUserSubmission
  );

  function handleSave(submission: UserSubmission) {
    axios
      .post('http://localhost:3000/api/WordSearchData', submission)
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
