import { EtapesDataContext } from "@/context/EtapesData";
import { useContext } from "react";

export function useEtapesData() {
  const contextValue = useContext(EtapesDataContext);
  if (!contextValue) {
    throw new Error("useEtapesData must be used within a EtapesDataProvider");
  }
  return contextValue;
}
