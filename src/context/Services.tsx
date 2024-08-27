import { ResizableDemande } from "@/features/services/ResizableDemande";
import { ServicesTable } from "@/features/services/ServicesTable";
import { fetchServices } from "@/lib/axios/services/fechAll";
import { Demande } from "@/types/Demande";
import { setStateType } from "@/types/setState";
import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

type ServicesContextType = {
  services: Demande[];
  setServices: setStateType<Demande[]>;
  setOption: setStateType<"services" | "demandes">;
  option: "services" | "demandes";
  bodyConetent: ReactNode;
};
const ServicesContextInitValue: ServicesContextType = {
  services: [],
  setServices: () => {},
  bodyConetent: <ServicesTable />,
  setOption: () => {},
  option: "services",
};

export const ServicesContext = createContext<ServicesContextType>(
  ServicesContextInitValue
);

interface ServiceProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function ServicesProvider({ children }: ServiceProviderProps) {
  const [services, setServices] = useState<Demande[]>([]);
  const [bodyConetent, setBodyConetent] = useState<ReactNode>(
    <ServicesTable />
  );
  const [option, setOption] = useState<"services" | "demandes">("services");

  useEffect(() => {
    if (option == "services") {
      setBodyConetent(<ServicesTable />);
    } else if (option == "demandes") {
      setBodyConetent(<ResizableDemande />);
    }
  }, [option]);

  async function getDemandes() {
    const data = await fetchServices();
    setServices(data);
  }

  useEffect(() => {
    getDemandes();
  }, []);

  const contextValue = {
    services,
    setServices,
    setOption,
    option,
    bodyConetent,
  };
  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
}
