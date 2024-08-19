import { AllDemandesTable } from "@/features/stdDemandes/AllDemandesTable";
import { SentDemandesTable } from "@/features/stdDemandes/SentDemandesTable";
import { Demande } from "@/types/Demande";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { setStateType } from "@/types/setState";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface DemandeContextType {
  services: Demande[];
  setServices: setStateType<Demande[]>;
  demandes: DemandeRequestType[];
  setDemandes: setStateType<DemandeRequestType[]>;
  option: string;
  setOption: setStateType<string>;
  bodyContent: ReactNode;
}

const DemandeContextInitValue: DemandeContextType = {
  services: [],
  setServices: () => {},
  demandes: [],
  setDemandes: () => {},
  option: "",
  setOption: () => {},
  bodyContent: <AllDemandesTable />,
};

export const demandesContext = createContext<DemandeContextType>(
  DemandeContextInitValue
);

interface DemandesProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function DemandesProvider({ children }: DemandesProviderProps) {
  const [services, setServices] = useState<Demande[]>([]);
  const [demandes, setDemandes] = useState<DemandeRequestType[]>([]);
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
    services,
    setServices,
    demandes,
    setDemandes,
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
