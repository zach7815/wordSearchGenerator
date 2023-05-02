import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';

const schema = z.object({
	authorName: string().min(4),
	header: string().min(4, { message: 'please select an option' }),
	title: string().min(4),
	difficulty: string().min(4, { message: 'please select an option' }),
	words: string(),
});

const headerOptions = [
	{ value: 'name, class and date', label: 'name, class and date' },
	{ value: 'name and date', label: 'name and date' },
	{ value: 'name only', label: 'name only' },
	{ value: 'none', label: 'none' },
];

const difficultyOptions = [
	{ value: 'easy', label: 'easy' },
	{ value: 'intermediate', label: 'intermediate' },
	{ value: 'Advanced', label: 'advanced' },
];
const Form = ({ onSave, userOptions = {} }) => {
	const { register, control, handleSubmit, formState } = useForm({
		defaultValues: userOptions,
		resolver: zodResolver(schema),
	});

	const { errors } = formState;
	const { field: headerOpt } = useController({ name: 'header', control });
	const { field: levels } = useController({ name: 'difficulty', control });

	const handleSave = (formValues) => {
		onSave(formValues);
	};

	const handleSelectChange = (option, field) => {
		field.onChange(option.value);
	};
	return (
		<form onSubmit={handleSubmit(handleSave)}>
			<div>
				<label>
					<p>Author's Name</p>
					<input name='authorName' {...register('authorName')} />
				</label>
				<div style={{ color: 'red' }}>{errors.authorName?.message} </div>
			</div>
			<div>
				<label>
					<p>choose what your header will contain</p>
					<Select
						value={headerOptions.find(({ value }) => value === headerOpt.value)}
						onChange={(option) => {
							handleSelectChange(option, headerOpt);
						}}
						options={headerOptions}
					/>
				</label>
				<div style={{ color: 'red' }}>{errors.header?.message} </div>
			</div>

			<div>
				<label>
					<p> Give your wordsearch a Title</p>
					<input name='title' {...register('title')} />
					<div style={{ color: 'red' }}>{errors.title?.message} </div>
				</label>
			</div>
			<div>
				<label>
					<p> Select your difficulty level</p>
					<Select
						value={difficultyOptions.find(
							({ value }) => value === levels.value,
						)}
						{...register('difficulty')}
						onChange={(option) => {
							handleSelectChange(option, levels);
						}}
						options={difficultyOptions}
					/>
					<div style={{ color: 'red' }}> {errors.difficulty?.message}</div>
				</label>
			</div>

			<div>
				<label>
					<p> Add your words, seperate each word by a comma ","</p>
					<textarea name='words' rows={5} cols={40} {...register('words')} />
				</label>
				<div style={{ color: 'red' }}> {errors.words?.message}</div>
			</div>
			<div style={{ marginTop: '12px' }}>
				<button type='submit'>submit</button>
			</div>
		</form>
	);
};

export default Form;
