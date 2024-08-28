import { pageLength } from "@/constants/pagination";
import { getEtapes } from "@/lib/axios/students/getEtapes";
import { EtapeDataType } from "@/types/EtapeDataType";
import { setStateType } from "@/types/setState";
import { createContext, useEffect, useState } from "react";

type EtapesDataContextType = {
  etapes: EtapeDataType[];
  setEtapes: setStateType<EtapeDataType[]>;
};

const etapesDataContextDefaultValue: EtapesDataContextType = {
  etapes: [],
  setEtapes: () => {},
};

export const EtapesDataContext = createContext<EtapesDataContextType>(
  etapesDataContextDefaultValue
);

type EtapesDataProviderProps = {
  children: React.ReactNode;
};

export function EtapesDataProvider({ children }: EtapesDataProviderProps) {
  const [etapes, setEtapes] = useState<EtapeDataType[]>([]);

  useEffect(() => {
    async function fetchFile() {
      const newData = await getEtapes(1, pageLength);
      setEtapes(newData);
    }
    fetchFile();
  }, []);

  const initValue = {
    etapes,
    setEtapes,
  };
  return (
    <EtapesDataContext.Provider value={initValue}>
      {children}
    </EtapesDataContext.Provider>
  );
}
