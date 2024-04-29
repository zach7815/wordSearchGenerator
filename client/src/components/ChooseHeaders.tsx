import Select from 'react-select';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';
import { UserSubmission, Option, Field } from '../../../Types/index.js';

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

interface FormProps {
  handleSave: (submission: UserSubmission) => void;
  userSubmission: UserSubmission;
  setUserSubmission: (submission: UserSubmission) => void;
}

export const Headers: React.FC<FormProps> = ({ userSubmission }) => {
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
      <div >
        <h3>Choose your header design</h3>
        <div style={{ color: 'red' }}>{errors.authorName?.message} </div>
      </div>
      <div>
        <label>
          <p>Author</p>
          <input type="text" />
        </label>
        <label>
          <p>choose what your header will contain</p>
          <Select
            required
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
      </div>
    </div>
  );
};
