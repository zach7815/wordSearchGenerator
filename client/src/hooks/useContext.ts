import { useContext } from "react";
import AppContext, { AppContextType } from "../context/formContext";

function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
export default useAppContext