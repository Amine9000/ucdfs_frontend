import { FileDataItem } from "@/types/FileDataItem";
import { FileTable } from "./FileTable";
import { useEffect, useState } from "react";
import { getEtapes } from "@/lib/axios/fileData";

export function FileList() {
  const [data, setData] = useState<FileDataItem[]>([]);

  useEffect(() => {
    async function fetchFile() {
      const newData = await getEtapes();
      setData(newData);
    }
    fetchFile();
  }, []);
  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {data.length == 0 && (
        <p className="text-sm text-slate-600">
          no files found. click the new button to add one
        </p>
      )}
      {data.length > 0 && <FileTable data={data} />}
    </div>
  );
}
