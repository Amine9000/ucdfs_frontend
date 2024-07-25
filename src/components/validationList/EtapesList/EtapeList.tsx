import { EtapesTable } from "./EtapesTable";
import { useEtapesData } from "@/hooks/useEtapesData";

export function EtapeList() {
  const { etapes } = useEtapesData();
  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {etapes.length == 0 && (
        <p className="text-sm text-slate-600">
          Pas d'étapes trouvées. cliquez sur le nouveau bouton pour en ajouter
          une.
        </p>
      )}
      {etapes.length > 0 && <EtapesTable />}
    </div>
  );
}
