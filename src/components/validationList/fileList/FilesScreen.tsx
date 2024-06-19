import { useEffect, useState } from "react";
import { FileList } from "./FileList";
import { FileListNavbar } from "./FileListNavbar";
import { FileDataItem } from "@/types/FileDataItem";
import { getEtapes } from "@/lib/axios/studentsData";
import { pageLength } from "@/constants/pagination";

export function FileScreen() {
  const [data, setData] = useState<FileDataItem[]>([]);

  useEffect(() => {
    async function fetchFile() {
      const newData = await getEtapes(1, pageLength);
      setData(newData);
    }
    fetchFile();
  }, []);
  return (
    <div className="w-full h-full flex-grow flex-shrink-0 flex flex-col items-center justify-start gap-2">
      <FileListNavbar etapes={data} setEtapes={setData} />
      <FileList etapes={data} />
    </div>
  );
}
