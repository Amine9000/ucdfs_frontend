import { DataRecord } from "@/types/DataRecord";
import { setStateType } from "@/types/setState";
import { createContext, useState } from "react";

type StudentsDataContextType = {
  data: DataRecord[];
  semester: string;
  setData: setStateType<DataRecord[]>;
  setSemester: setStateType<string>;
  SVOption: string;
  setSVOption: setStateType<string>;
};

const StudentsDataContextInitValue = {
  data: [],
  semester: "",
  SVOption: "",
  setData: () => {},
  setSemester: () => {},
  setSVOption: () => {},
};

export const StudentsDataContext = createContext<StudentsDataContextType>(
  StudentsDataContextInitValue
);

type StudentsDataProviderProps = {
  children: React.ReactNode;
};

export function StudentsDataProvider({ children }: StudentsDataProviderProps) {
  const [data, setData] = useState<DataRecord[]>([]);
  const [semester, setSemester] = useState<string>("");
  const [SVOption, setSVOption] = useState<string>("students");

  const StudentsDataContextValue = {
    data,
    semester,
    setData,
    setSemester,
    SVOption,
    setSVOption,
  };

  return (
    <StudentsDataContext.Provider value={StudentsDataContextValue}>
      {children}
    </StudentsDataContext.Provider>
  );
}
