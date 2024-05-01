import React, { createContext } from 'react';
import { UserSubmission } from '../../../Types';

export interface AppContextType {
  userSubmission: UserSubmission;
  setUserSubmission: React.Dispatch<React.SetStateAction<UserSubmission>>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
