import { FileDataItem } from "@/types/FileDataItem";
import { FileTable } from "./FileTable";

type FileListProps = {
  etapes: FileDataItem[];
};

export function FileList({ etapes }: FileListProps) {
  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {etapes.length == 0 && (
        <p className="text-sm text-slate-600">
          no etapes found. click the new button to add one
        </p>
      )}
      {etapes.length > 0 && <FileTable data={etapes} />}
    </div>
  );
}
