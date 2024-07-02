import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import { Option, Field } from '../../../../Types/index.js';
import useAppContext from '../../hooks/useContext.js';
import { DifficultiesAndWords } from './difficultiesAndWordsInput.js';
import customStyles from '../../../utils/reactSelectStyles.js';
import {headerOptions} from '../../../utils/reactOptions'



const schema = z.object({
  authorName: string().min(4),
  header: string().min(4, { message: 'please select an option' }),
  title: string().min(4).max(25),
  difficulty: string().min(4, { message: 'please select an option' }),
  words: string(),
});

export const Headers: React.FC = () => {
  const { userSubmission, setUserSubmission } = useAppContext();

  const { control, formState } = useForm({
    defaultValues: userSubmission,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const { field: headerOpt } = useController({ name: 'header', control });

  const handleSelectChange = (option: Option | null, field: Field) => {
    if (option === null) return;
    field.onChange(option.value);
  };



  return (
    <div>
      <div></div>
      <div>
        <label>
          <p>Author</p>
          <input
            className="border-solid border-2 border-black  w-full min-w-[33.5rem] h-10 focus:border-blue-700 `"
            type="text"
            autoFocus
            required
            onChange={(event) => {
              const input = event.target.value;

              setUserSubmission((prevUserOptions) => ({
                ...prevUserOptions,
                authorName: input,
              }));
            }}
          />
          <div style={{ color: 'red' }}>{errors.authorName?.message} </div>
        </label>

        <label>
          <p>Title</p>
          <input
            type="text"
            className="border-solid border-2 border-black w-full min-w-[33.5rem]  h-10 focus:border-blue-700"
            required
            onChange={(event) => {
              const input = event.target.value;
              setUserSubmission((prevUserOptions) => ({
                ...prevUserOptions,
                title: input,
              }));
            }}
          />
        </label>
        <label>
          <p>choose what your header will contain</p>
          <Select
            styles={customStyles}
            className="min-w-[33rem] focus:border-blue-700"
            required
            value={
              headerOptions.find(
                (option) => option.value === headerOpt.value
              ) || null
            }
            onChange={(option) => {
              if (option) {
                handleSelectChange(option, headerOpt);
                setUserSubmission((prevUserOptions) => ({
                  ...prevUserOptions,
                  header: option.value,
                }));
              } else return;
            }}
            options={headerOptions}
          />
        </label>
      </div>
      <DifficultiesAndWords />
    </div>
  );
};
