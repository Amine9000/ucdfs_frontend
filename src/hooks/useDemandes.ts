import { demandesContext } from "@/context/Demandes";
import { useContext } from "react";

export function useDemandes() {
  const demandesCtx = useContext(demandesContext);
  if (!demandesCtx) {
    throw new Error("useDemandes must be used within a DemandesProvider");
  }
  return demandesCtx;
}
