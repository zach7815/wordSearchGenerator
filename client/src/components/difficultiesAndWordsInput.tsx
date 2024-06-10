import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import useAppContext from '../hooks/useContext.js';
import { Option, Field } from '../../../Types/index.js';
const difficultyOptions = [
  { value: '10x10', label: '10x10' },
  { value: '15x15', label: '15x15' },
  { value: '20x20', label: '20x20' },
];

const schema = z.object({
  difficulty: string().min(4, { message: 'please select an option' }),
  words: string().array().nonempty(),
});

export const DifficultiesAndWords: React.FC = () => {
  const { register, control } = useForm({
    resolver: zodResolver(schema),
  });

  const { userSubmission, setUserSubmission, setWordLimit } = useAppContext();

  const [levelChoice, setLevelChoice] = useState<string>('');
  const [wordLimitMessage, setWordLimitMessage] = useState<string>('');

  const { field: Field } = useController({ name: 'header', control });

  const handleSelectChange = (option: Option | null, field: Field) => {
    if (option === null) return;
    field.onChange(option.value);
    setLevelChoice(option.value);
  };

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
      </div>
      <div>
        <label>
          <p> Select your difficulty level</p>
          <Select
            required
            autoFocus
            value={difficultyOptions.find(({ value }) => value === Field.value)}
            {...register('difficulty')}
            onChange={(option) => {
              if (option) {
                handleSelectChange(option, Field);
                setUserSubmission((prevState) => ({
                  ...prevState,
                  difficulty: option.value,
                }));
              }
            }}
            options={difficultyOptions}
          />
        </label>
        <div>{wordLimitMessage}</div>
      </div>
    </div>
  );
};
