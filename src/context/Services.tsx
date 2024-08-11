import { fetchServices } from "@/lib/axios/services/fechAll";
import { Demande } from "@/types/Demande";
import { setStateType } from "@/types/setState";
import { HTMLAttributes, createContext, useEffect, useState } from "react";

type ServicesContextType = {
  services: Demande[];
  setServices: setStateType<Demande[]>;
};
const ServicesContextInitValue: ServicesContextType = {
  services: [],
  setServices: () => {},
};

export const ServicesContext = createContext<ServicesContextType>(
  ServicesContextInitValue
);

interface ServiceProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function ServicesProvider({ children }: ServiceProviderProps) {
  const [services, setServices] = useState<Demande[]>([]);

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
  };
  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
}
