export interface UserSubmission {
  authorName: '';
  header: '';
  title: '';
  difficulty: '';
  words: [];
}

export interface Option {
  value: string;
  label: string;
}

export interface Field {
  onChange: (value: string) => void;
}
