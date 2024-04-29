import React, { createContext } from 'react';
import { UserSubmission } from '../../../Types';

interface FormContextType {
  userSubmission: UserSubmission;
  setUserSubmission: React.Dispatch<React.SetStateAction<UserSubmission>>;
}
const FormContext = createContext<FormContextType | undefined>(undefined);

export default FormContext;
