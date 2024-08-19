import { DemandeRequestType } from "@/types/serviceRequestType";
import { setStateType } from "@/types/setState";
import { HTMLAttributes, createContext, useState } from "react";

type ServiceRequestsType = {
  serviceRequests: DemandeRequestType[];
  setServiceRequests: setStateType<DemandeRequestType[]>;
};

const ServiceRequestsInitValue = {
  serviceRequests: [],
  setServiceRequests: () => {},
};

export const ServiceRequestsContext = createContext<ServiceRequestsType>(
  ServiceRequestsInitValue
);

interface ServiceRequestsProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function ServiceRequestsProvider({
  children,
}: ServiceRequestsProviderProps) {
  const [serviceRequests, setServiceRequests] = useState<DemandeRequestType[]>(
    []
  );

  const initValue = {
    serviceRequests,
    setServiceRequests,
  };

  return (
    <ServiceRequestsContext.Provider value={initValue}>
      {children}
    </ServiceRequestsContext.Provider>
  );
}
