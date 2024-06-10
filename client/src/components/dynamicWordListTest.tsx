import { useState } from 'react';
import useAppContext from '../hooks/useContext.js';

const DynamicTest = () => {
  const [values, setValues] = useState(['']);
  const { wordLimit } = useAppContext();

  const createUI = () => {
    return values.map((el, i: number) => {
      return (
        <div key={i}>
          <input type="text" onInput={(event) => handleChange(i, event)} />
          {i > 0 && (
            <input
              type="button"
              value="remove"
              onClick={() => removeClick(i)}
            />
          )}
        </div>
      );
    });
  };

  const handleChange = (
    i: number,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const input = event.currentTarget.value;

    const updatedValues = [...values];
    updatedValues[i] = input;
    setValues(updatedValues);

    if (
      input.trim() !== '' &&
      i === values.length - 1 &&
      values.length < wordLimit
    ) {
      setValues([...values, '']);
    }
  };

  const removeClick = (i: number) => {
    const updatedValues = [...values];
    updatedValues.splice(i, 1);
    setValues(updatedValues);
  };

  return <>{createUI()}</>;
};
export default DynamicTest;
