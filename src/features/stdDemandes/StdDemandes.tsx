import { DemandesProvider } from "@/context/Demandes";
import { StdDemandesBody } from "./StdDemandesBody";
import { StdDemandesNav } from "./StdDemandesNav";

export function StdDemandes() {
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col gap-2">
      <DemandesProvider>
        <StdDemandesNav />
        <StdDemandesBody />
      </DemandesProvider>
    </div>
  );
}
