export type Option = {
  label: string;
  value: string;
  callback: (value: string) => void | null;
};
