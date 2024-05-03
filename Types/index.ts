export interface UserSubmission {
  authorName: string;
  header: string;
  title: string | null;
  difficulty: string;
  words: string[];
}

export interface Option {
  value: string;
  label: string;
}

export interface Field {
  onChange: (value: string) => void;
}

type HandleSaveFunction = (data: UserSubmission) => void;
export interface FormContainerProps {
  handleSave: HandleSaveFunction;
}