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
  option: "services" | "demandes";
  setOption: setStateType<"services" | "demandes">;
  bodyContent: ReactNode;
  selectedDemande: DemandeRequestType | null;
  setSelectedDemande: setStateType<DemandeRequestType | null>;
}

const DemandeContextInitValue: DemandeContextType = {
  services: [],
  setServices: () => {},
  demandes: [],
  setDemandes: () => {},
  option: "services",
  setOption: () => {},
  bodyContent: <AllDemandesTable />,
  selectedDemande: null,
  setSelectedDemande: () => {},
};

export const demandesContext = createContext<DemandeContextType>(
  DemandeContextInitValue
);

interface DemandesProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function DemandesProvider({ children }: DemandesProviderProps) {
  const [services, setServices] = useState<Demande[]>([]);
  const [demandes, setDemandes] = useState<DemandeRequestType[]>([]);
  const [option, setOption] = useState<"services" | "demandes">("services");
  const [bodyContent, setBodyContent] = useState<ReactNode>(
    <AllDemandesTable />
  );
  const [selectedDemande, setSelectedDemande] =
    useState<DemandeRequestType | null>(null);

  useEffect(() => {
    switch (option) {
      case "services":
        setBodyContent(<AllDemandesTable />);
        break;
      case "demandes":
        setBodyContent(<SentDemandesTable />);
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
    selectedDemande,
    setSelectedDemande,
  };
  return (
    <demandesContext.Provider value={initValue}>
      {children}
    </demandesContext.Provider>
  );
}
