import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import useAppContext from '../../hooks/useContext.js';
import { Option, Field } from '../../../../Types/index.js';
import { difficultyOptions } from '../../../utils/reactOptions';
import customStyles from '../../../utils/reactSelectStyles';

const schema = z.object({
  difficulty: string().min(4, { message: 'please select an option' }),
  words: string().array().nonempty(),
});

export const DifficultiesAndWords: React.FC = () => {
  const { register, control } = useForm({
    resolver: zodResolver(schema),
  });

  const { setUserSubmission, setWordLimit, message, setMessage } =
    useAppContext();

  const [levelChoice, setLevelChoice] = useState<string>('');
  const { field: Field } = useController({ name: 'header', control });

  const handleSelectChange = (option: Option | null, field: Field) => {
    if (option === null) return;
    field.onChange(option.value);
    setLevelChoice(option.value);
  };

  useEffect(() => {
    if (levelChoice === null) return;
    switch (levelChoice) {
      case '10x10':
        setMessage(
          'Maximum word amount is 15 words, max word length being 10 characters. '
        );

        setWordLimit(15);
        break;

      case '15x15':
        setMessage(
          'Maximum word amount is 20 words, max word length being 10 characters.'
        );
        setWordLimit(20);
        break;

      case '20x20':
        setMessage(
          'Maximum word amount is 30 words, max word length being 10 characters.'
        );
        setWordLimit(30);
        break;
    }
  }, [setLevelChoice, levelChoice, setWordLimit, setMessage]);

  return (
    <div>
      <div>
        <h3>Choose your header design</h3>
      </div>
      <div>
        <label>
          <p> Select your difficulty level</p>
          <Select
            className=" min-w-[33.5rem] focus:border-none"
            required
            styles={customStyles}
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
        <div
          className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
            message ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="min-h-[2rem]">{message}</div>
        </div>
      </div>
    </div>
  );
};
