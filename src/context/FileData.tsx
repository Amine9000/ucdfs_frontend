import { FileColumnNames } from "@/types/FileColumnNames";
import { setStateType } from "@/types/setState";
import { createContext, useState } from "react";

type FileDataContextType = {
  data: FileColumnNames[];
  semester: string;
  setData: setStateType<FileColumnNames[]>;
  setSemester: setStateType<string>;
};

const FileDataContextInitValue = {
  data: [],
  semester: "",
  setData: () => {},
  setSemester: () => {},
};

export const FileDataContext = createContext<FileDataContextType>(
  FileDataContextInitValue
);

type FileDataProviderProps = {
  children: React.ReactNode;
};

export function FileDataProvider({ children }: FileDataProviderProps) {
  const [data, setData] = useState<FileColumnNames[]>([]);
  const [semester, setSemester] = useState<string>("");

  const FileDataContextValue = {
    data,
    semester,
    setData,
    setSemester,
  };

  return (
    <FileDataContext.Provider value={FileDataContextValue}>
      {children}
    </FileDataContext.Provider>
  );
}
