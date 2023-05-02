import { useEffect } from 'react';
import Form from './form';

function App() {
	const userOptions = {
		authorName: 'Mr Best',
		header: 'name only',
		title: 'New WordSearch',
		difficulty: 'easy',
		words: 'test, random, word, challenge',
	};

	const handleSave = (values) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		};
		console.log(requestOptions);

		fetch('http://localhost:3000/api/WordSearchData', requestOptions).then(
			(result) => {
				console.log(result);
			},
		);
	};

	return (
		<>
			<div className='App'>
				<h1> WordSearch Generator</h1>
				<div className='formContainer'>
					<Form onSave={handleSave} {...{ userOptions }} />
				</div>
			</div>
		</>
	);
}

export default App;
