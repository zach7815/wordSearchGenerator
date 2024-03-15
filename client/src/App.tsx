import axios from 'axios';
import { UserSubmission } from './interfaces/formInterfaces';
import './App.css';
import { Form } from './components/form';

function App() {
  function handleSave(submission: UserSubmission) {
    axios
      .post('http://localhost:3000/api/WordSearchData', submission)
      .then((result) => console.log(result));
  }

  return (
    <div>
      <div className="App">
        <div className="formContainer">
          <Form handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default App;
