import { useEffect, useState } from "react";
import { EtapeList } from "./EtapeList";
import { EtapeListNavbar } from "./EtapeListNavbar";
import { EtapeDataType } from "@/types/EtapeDataType";
import { getEtapes } from "@/lib/axios/studentsData";
import { pageLength } from "@/constants/pagination";

export function EtapeListScreen() {
  const [data, setData] = useState<EtapeDataType[]>([]);

  useEffect(() => {
    async function fetchFile() {
      const newData = await getEtapes(1, pageLength);
      setData(newData);
    }
    fetchFile();
  }, []);
  return (
    <div className="w-full h-full flex-grow flex-shrink-0 flex flex-col items-center justify-start gap-2">
      <EtapeListNavbar etapes={data} setEtapes={setData} />
      <EtapeList etapes={data} setData={setData} />
    </div>
  );
}
