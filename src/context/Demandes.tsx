import { AllDemandesTable } from "@/features/stdDemandes/AllDemandesTable";
import { SentDemandesTable } from "@/features/stdDemandes/SentDemandesTable";
import { setStateType } from "@/types/setState";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface DemandeContextType {
  data: object[];
  setData: setStateType<object[]>;
  option: string;
  setOption: setStateType<string>;
  bodyContent: ReactNode;
}

const DemandeContextInitValue: DemandeContextType = {
  data: [],
  setData: () => {},
  option: "",
  setOption: () => {},
  bodyContent: <AllDemandesTable />,
};

export const demandesContext = createContext<DemandeContextType>(
  DemandeContextInitValue
);

interface DemandesProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function DemandesProvider({ children }: DemandesProviderProps) {
  const [data, setData] = useState<object[]>([]);
  const [option, setOption] = useState<string>("list");
  const [bodyContent, setBodyContent] = useState<ReactNode>(
    <AllDemandesTable />
  );
  useEffect(() => {
    switch (option) {
      case "list":
        setBodyContent(<AllDemandesTable />);
        break;
      case "sent":
        setBodyContent(<SentDemandesTable />);
        break;
      default:
        break;
    }
  }, [option]);
  const initValue: DemandeContextType = {
    data,
    setData,
    option,
    setOption,
    bodyContent,
  };
  return (
    <demandesContext.Provider value={initValue}>
      {children}
    </demandesContext.Provider>
  );
}
