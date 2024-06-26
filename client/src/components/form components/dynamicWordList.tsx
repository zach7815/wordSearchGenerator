import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useContext.js';

const DynamicWordList = () => {
  const [values, setValues] = useState(['']);
  const { wordLimit, message, userSubmission, setUserSubmission } =
    useAppContext();

  useEffect(() => {
    if (userSubmission && values !== userSubmission.words) {
      setUserSubmission({ ...userSubmission, words: values });
    }
  }, [values, userSubmission, setUserSubmission]);

  const createUI = () => {
    return values.map((_, i: number) => {
      return (
        <div key={i}>
          <input
            type="text"
            onInput={(event) => handleChange(i, event)}
            className="border-solid border-2 border-black mt-2 h-10 min-w-[33.5rem]"
          />
          {i > 0 && (
            <input
              className="border-solid border-2 border-black ml-2 p-1.5 cursor-pointer min-w-[33.5rem]"
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

  return (
    <div>
      <div className="message">{message}</div>
      {createUI()}
    </div>
  );
};
export default DynamicWordList;
