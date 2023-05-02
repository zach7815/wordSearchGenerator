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
		console.log({ values });
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
