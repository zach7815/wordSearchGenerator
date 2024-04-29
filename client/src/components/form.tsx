import React from 'react';
import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import { UserSubmission, Option, Field } from '../../../Types/index.js';

const schema = z.object({
  authorName: string().min(4),
  header: string().min(4, { message: 'please select an option' }),
  title: string().min(4).max(25),
  difficulty: string().min(4, { message: 'please select an option' }),
  words: string(),
});

const headerOptions = [
  {
    value: 'name, class, date and grade',
    label: 'name, class, date and grade',
  },
  { value: 'name, class and date', label: 'name, class and date' },
  { value: 'name and date', label: 'name and date' },
  { value: 'name only', label: 'name only' },
  { value: 'none', label: 'none' },
];

const difficultyOptions = [
  { value: '10x10', label: '10x10' },
  { value: '15x15', label: '15x15' },
  { value: '20x20', label: '20x20' },
];

interface FormProps {
  handleSave: (submission: UserSubmission) => void;
  userSubmission: UserSubmission; // Corrected prop name
  setUserSubmission: (submission: UserSubmission) => void;
}
export const Form: React.FC<FormProps> = ({ handleSave, userSubmission }) => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: userSubmission,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const { field: headerOpt } = useController({ name: 'header', control });
  const { field: levels } = useController({ name: 'difficulty', control });

  const handleSelectChange = (option: Option | null, field: Field) => {
    if (option === null) return;
    field.onChange(option.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSave)}>
        <div>
          <label>
            <p>Author's Name</p>
            <input {...register('authorName')} />
          </label>
          <div style={{ color: 'red' }}>{errors.authorName?.message} </div>
        </div>
        <div>
          <label>
            <p>choose what your header will contain</p>
            <Select
              value={
                headerOptions.find(
                  (option) => option.value === headerOpt.value
                ) || null
              }
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
            <input {...register('title')} />
            <div style={{ color: 'red' }}>{errors.title?.message} </div>
          </label>
        </div>
        <div>
          <label>
            <p> Select your difficulty level</p>
            <Select
              value={difficultyOptions.find(
                ({ value }) => value === levels.value
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
            <textarea rows={5} cols={40} {...register('words')} />
          </label>
          <div style={{ color: 'red' }}> {errors.words?.message}</div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};
