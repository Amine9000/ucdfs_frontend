import { ServiceRequestsContext } from "@/context/ServiceRequest";
import { useContext } from "react";

export function useServiceRequests() {
  const serviceRequest = useContext(ServiceRequestsContext);
  if (!serviceRequest) {
    throw new Error(
      "useServiceRequests must be used within a ServiceRequestsProvider"
    );
  }
  return serviceRequest;
}
