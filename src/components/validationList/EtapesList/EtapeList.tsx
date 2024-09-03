import { EtapesTable } from "./EtapesTable";
import { useEtapesData } from "@/hooks/useEtapesData";

export function EtapeList() {
  const { etapes } = useEtapesData();
  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {etapes.length == 0 && (
        <p className="text-sm w-full h-full text-gray-500 flex items-center justify-center">
          Pas d'étapes trouvées. cliquez sur le nouveau bouton pour en ajouter
          une.
        </p>
      )}
      {etapes.length > 0 && <EtapesTable />}
    </div>
  );
}
