import { useFileData } from "@/hooks/useFileData";
import { FileDataTable } from "./FileDataTable";

export function FileData() {
  const { data } = useFileData();

  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {data.length == 0 && (
        <p className="text-sm text-slate-600">Aucun étudiant inscrit.</p>
      )}
      {data.length > 0 && <FileDataTable data={data} />}
    </div>
  );
}
