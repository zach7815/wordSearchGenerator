import Select, { StylesConfig } from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import { Option, Field } from '../../../../Types/index.js';
import useAppContext from '../../hooks/useContext.js';
import { DifficultiesAndWords } from './difficultiesAndWordsInput.js';

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

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      borderRadius: 0,
      borderColor: '#000000',
      border: 'solid 2px',
    }),
  };

  return (
    <div>
      <div></div>
      <div>
        <label>
          <p>Author</p>
          <input
            className="border-solid border-2 border-black  w-full min-w-[33.5rem] h-10"
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
            className="border-solid border-2 border-black w-full min-w-[33.5rem]  h-10"
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
            // className="border-solid border-2 border-black"
            styles={customStyles}
            className="min-w-[33rem]"
            required
            value={
              headerOptions.find(
                (option) => option.value === headerOpt.value
              ) || null
            }
            onChange={(option) => {
              if (option) {
                handleSelectChange(option, headerOpt);
                console.log(option);
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
