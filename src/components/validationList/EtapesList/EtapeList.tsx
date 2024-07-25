import { EtapeDataType } from "@/types/EtapeDataType";
import { EtapesTable } from "./EtapesTable";
import { setStateType } from "@/types/setState";

type FileListProps = {
  etapes: EtapeDataType[];
  setData: setStateType<EtapeDataType[]>;
};

export function EtapeList({ etapes, setData }: FileListProps) {
  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {etapes.length == 0 && (
        <p className="text-sm text-slate-600">
          Pas d'étapes trouvées. cliquez sur le nouveau bouton pour en ajouter
          une.
        </p>
      )}
      {etapes.length > 0 && <EtapesTable data={etapes} setData={setData} />}
    </div>
  );
}
