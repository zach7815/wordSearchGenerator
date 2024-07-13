import { useEffect, useState, useRef } from 'react';
import useAppContext from '../../hooks/useContext.js';

const DynamicWordList = () => {
  const [values, setValues] = useState<string[]>(['']);
  const { wordLimit, message, userSubmission, setUserSubmission } =
    useAppContext();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (userSubmission && values !== userSubmission.words) {
      setUserSubmission({ ...userSubmission, words: values });
    }
  }, [values, userSubmission, setUserSubmission]);

  useEffect(() => {
    // Focus on the first input field when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const createUI = () => {
    return values.map((_, i: number) => {
      return (
        <div key={i}>
          <input
            type="text"
            onInput={(event) => handleChange(i, event)}
            className=" relative  left-1 border-solid border-2 border-black mt-2 h-10 min-w-[20.5rem] focus:border-blue-700"
            ref={(el) => {
              if (el !== null) {
                inputRefs.current[i] = el;
              }
            }}
          />
          {i > 0 && (
            <input
              className=" bg-gray-300 hover:bg-gray-400 text-gray-800 rounded ml-2 p-1.5 cursor-pointer"
              type="button"
              value="remove"
              onClick={() => {
                removeClick(i);
              }}
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
      // Focus on the new input field
      if (inputRefs.current[i + 1]) {
        inputRefs.current[i + 1].focus();
      }
    }
  };

  const removeClick = (i: number) => {
    const updatedValues = [...values];
    updatedValues.splice(i, 1);
    setValues(updatedValues);

    // Focus on the next input field after removing the current one
    if (inputRefs.current[i]) {
      inputRefs.current[i].focus();
    }
  };

  const addInputField = () => {
    const updatedValues = [...values];
    if (updatedValues.length === wordLimit) {
      return;
    }
    updatedValues.push('');
    setValues(updatedValues);

    // Focus on the new input field
    if (inputRefs.current[updatedValues.length - 1]) {
      inputRefs.current[updatedValues.length - 1].focus();
    }
  };

  return (
    <div className="scrollable h-[41rem] overflow-auto">
      <div className="message">{message}</div>
      {createUI()}
      {values.length !== wordLimit && (
        <input
          className=" bg-gray-300 hover:bg-gray-400 ml-2 p-1.5 cursor-pointer rounded mt-2 relative right-[0.35rem]"
          type="button"
          value="add words"
          onClick={() => addInputField()}
        />
      )}
    </div>
  );
};
export default DynamicWordList;
