import { StylesConfig } from 'react-select';

const customStyles: StylesConfig = {
  control: (base, { isFocused }) => ({
    ...base,
    borderRadius: 0,
    borderColor: isFocused ? 'rgb(37 99 235)' : '#000000',
    border: 'solid 2px',
    '&:focus-within': {
      borderColor: 'rgb(37 99 235)',
    },
    '&:hover': {
      borderColor: 'rgb(37 99 235)',
    },
  }),
};

export default customStyles;
