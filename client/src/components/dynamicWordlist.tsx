import { ChangeEvent, useState } from 'react';

export const DynamicWordList = () => {
  const [words, setWords] = useState<string[]>([]);

  const addFields = () => {
    const newField: string = '';
    setWords([...words, newField]);
  };

  const handleFormChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const data: string[] = [...words];
    data[index] = event.target.value;
    setWords(data);
  };

  return (
    <div>
      {words.map((input, index) => {
        return (
          <div key={JSON.stringify(input + index)}>
            <input
              name="word"
              placeholder="word"
              value={input}
              onChange={(event) => {
                handleFormChange(index, event);
              }}
            />
          </div>
        );
      })}
      <button onClick={addFields}>add word</button>
    </div>
  );
};
