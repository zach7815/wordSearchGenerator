import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';

import { UserSubmission, Option, Field } from '../../../Types/index.js';
const difficultyOptions = [
  { value: '10x10', label: '10x10' },
  { value: '15x15', label: '15x15' },
  { value: '20x20', label: '20x20' },
];

const schema = z.object({
  authorName: string().min(4),
  header: string().min(4, { message: 'please select an option' }),
  title: string().min(4).max(25),
  difficulty: string().min(4, { message: 'please select an option' }),
  words: string(),
});

interface FormProps {
  handleSave: (submission: UserSubmission) => void;
  userSubmission: UserSubmission; // Corrected prop name
  setUserSubmission: (submission: UserSubmission) => void;
}

export const DifficultiesAndWords: React.FC<FormProps> = ({
  userSubmission,
}) => {
  const { register, control, formState } = useForm({
    defaultValues: userSubmission,
    resolver: zodResolver(schema),
  });

  const [levelChoice, setLevelChoice] = useState<string>('');
  const [wordLimitMessage, setWordLimitMessage] = useState<string>('');
  const [wordLimit, setWordLimit] = useState<number>(0);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const { errors } = formState;
  const { field: Field } = useController({ name: 'header', control });

  const handleSelectChange = (option: Option | null, field: Field) => {
    if (option === null) return;
    field.onChange(option.value);
    setLevelChoice(option.value);
    setShouldAnimate(true);
  };

  const numColumns = Math.ceil(wordLimit / 5);
  const numInputs = Math.min(wordLimit, 5);

  useEffect(() => {
    if (levelChoice === null) return;
    let message: string = '';
    switch (levelChoice) {
      case '10x10':
        message =
          'Maximum word amount is 15 words, max word length being 10 characters. ';
        setWordLimit(15);
        break;

      case '15x15':
        message =
          'Maximum word amount is 20 words, max word length being 10 characters.';
        setWordLimit(20);
        break;

      case '20x20':
        message =
          'Maximum word amount is 30 words, max word length being 10 characters.';
        setWordLimit(30);
        break;
    }
    setWordLimitMessage(message);
  }, [setLevelChoice, levelChoice]);

  return (
    <div>
      <div>
        <h3>Choose your header design</h3>
        <div style={{ color: 'red' }}>{errors.authorName?.message} </div>
      </div>
      <div>
        <label>
          <p> Select your difficulty level</p>
          <Select
          required
            value={difficultyOptions.find(({ value }) => value === Field.value)}
            {...register('difficulty')}
            onChange={(option) => {
              handleSelectChange(option, Field);
            }}
            options={difficultyOptions}
          />
          <div style={{ color: 'red' }}> {errors.difficulty?.message}</div>
        </label>
        <div>{wordLimitMessage}</div>

        <div
          className={`fade-slide-in-animation ${
            shouldAnimate ? 'fade-slide-in-active' : ''
          }`}
        >
          <div className="input-container">
            {/* Create columns */}
            {Array.from({ length: numColumns }, (_, columnIndex) => (
              <div key={columnIndex} style={{ flex: 1 }}>
                {/* Create inputs within each column */}
                {Array.from({ length: numInputs }, (_, inputIndex) => (
                  <input key={inputIndex} type="text" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
