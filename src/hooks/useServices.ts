import { ServicesContext } from "@/context/Services";
import { useContext } from "react";

export function useServices() {
  const servicesData = useContext(ServicesContext);
  if (!servicesData) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return servicesData;
}
