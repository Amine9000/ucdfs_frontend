import { DataRecord } from "@/types/DataRecord";
import { setStateType } from "@/types/setState";
import { createContext, useState } from "react";

type StudentsDataContextType = {
  data: DataRecord[];
  semester: { code: string; name: string };
  setData: setStateType<DataRecord[]>;
  setSemester: setStateType<{ code: string; name: string }>;
  SVOption: string;
  setSVOption: setStateType<string>;
};

const StudentsDataContextInitValue = {
  data: [],
  semester: { code: "", name: "" },
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
  const [semester, setSemester] = useState<{ code: string; name: string }>({
    code: "",
    name: "",
  });
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
