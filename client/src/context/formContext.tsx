import React, { createContext } from 'react';
import { UserSubmission } from '../../../Types';

export interface AppContextType {
  userSubmission: UserSubmission;
  setUserSubmission: React.Dispatch<React.SetStateAction<UserSubmission>>;
  wordLimit: number;
  setWordLimit: React.Dispatch<React.SetStateAction<number>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
