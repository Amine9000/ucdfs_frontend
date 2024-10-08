import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { EtapeDataType } from "@/types/EtapeDataType";
import {
  EllipsisVertical,
  Settings2,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { OptionsSheet } from "@/components/global/optionsSheet";
import { Option } from "@/types/Option";
import { deleteEtape } from "@/lib/axios/etapes/deleteEtape";
import { updateEtape } from "@/lib/axios/etapes/uppdateEtape";
import { DataRecord } from "@/types/DataRecord";
import { useEtapesData } from "@/hooks/useEtapesData";
import { useTabs } from "@/hooks/useTabs";
import { Screen } from "@/enums/Screens";
import toast from "react-hot-toast";

export function EtapesTable() {
  const { navigateTo, setData: setShareTabsdata } = useTabs();
  const { etapes, setEtapes } = useEtapesData();
  const [columns, setColumns] = useState<string[]>([]);
  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: async (
        etape_code: string,
        etape?: EtapeDataType | DataRecord
      ) => {
        toast.promise(
          (async () => {
            const res = await updateEtape(etape_code, etape as EtapeDataType);
            if (res.status == 201) {
              const index = etapes.findIndex(
                (item) => item.code === etape_code
              );
              const ndata = [
                ...etapes.slice(0, index),
                etape,
                ...etapes.slice(index + 1),
              ];
              setEtapes(ndata as EtapeDataType[]);
            } else {
              throw new Error(res.message);
            }
          })(),
          {
            loading: "updating etape ...",
            success: "etape updated",
            error: "error while updating",
          }
        );
      },
      icon: Settings2,
    },
    {
      label: "Delete",
      value: "delete",
      callback: (etape_code: string) => {
        deleteEtape(etape_code);
        const ndata = etapes.filter((d) => {
          return d.code !== etape_code;
        });
        setEtapes(ndata);
      },
      icon: Trash2,
    },
    {
      label: "Students",
      value: "showstudents",
      callback: (etapeCode: string, data?: DataRecord | EtapeDataType) => {
        setShareTabsdata({
          etapeCode,
          etapeName: (data?.nom ?? "None") as string,
        });
        navigateTo(Screen.StudentsData);
      },
      icon: SquareArrowOutUpRight,
    },
  ];

  useEffect(() => {
    if (etapes.length > 0) {
      setColumns(Object.keys(etapes[0]));
    }
  }, [etapes]);
  return (
    <>
      <Table>
        <TableCaption>Liste d'étapes.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead className="text-slate-900" key={index}>
                {column}
              </TableHead>
            ))}
            <TableHead className="text-slate-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <MapFileData data={etapes} options={options} />
        </TableBody>
      </Table>
    </>
  );
}

function MapFileData({
  data,
  options,
}: {
  data: EtapeDataType[];
  options: Option[];
}) {
  return data.map((etape, index) => {
    return (
      <TableRow className="cursor-pointer" key={index}>
        {Object.values(etape).map((value, index) => (
          <TableCell className="text-sm text-slate-700" key={index}>
            {value}
          </TableCell>
        ))}
        <TableCell>
          <OptionsSheet options={options} data={etape}>
            <EllipsisVertical className="text-slate-600" />
          </OptionsSheet>
        </TableCell>
      </TableRow>
    );
  });
}
