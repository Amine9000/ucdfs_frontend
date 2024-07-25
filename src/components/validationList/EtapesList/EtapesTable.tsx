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
import { UCDAlertDialog } from "./Dialog";
import { AlertMessageType } from "@/types/AlertMessage";
import { useScreen } from "@/hooks/useScreen";
import { OptionsSheet } from "@/components/global/optionsSheet";
import { Option } from "@/types/Option";
import { deleteEtape } from "@/lib/axios/deleteEtape";
import { setStateType } from "@/types/setState";
import { updateEtape } from "@/lib/axios/uppdateEtape";
import { DataRecord } from "@/types/DataRecord";

type FileTableProps = {
  data: EtapeDataType[];
  setData: setStateType<EtapeDataType[]>;
};

const deleteMessageDialog: AlertMessageType = {
  title: "Delete File",
  description: "Are you sure you want to delete this file?",
  type: "error",
};

export function EtapesTable({ data, setData }: FileTableProps) {
  const { screenSelectedHandler } = useScreen();
  const [deleteDialog, setDeleteAlert] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: async (
        etape_code: string,
        etape?: EtapeDataType | DataRecord
      ) => {
        const res = await updateEtape(etape_code, etape as EtapeDataType);
        if (res) {
          const index = data.findIndex((item) => item.code === etape_code);
          const ndata = [
            ...data.slice(0, index),
            etape,
            ...data.slice(index + 1),
          ];
          setData(ndata as EtapeDataType[]);
        }
      },
      icon: Settings2,
    },
    {
      label: "Delete",
      value: "delete",
      callback: (etape_code: string) => {
        deleteEtape(etape_code);
        const ndata = data.filter((d) => {
          return d.code !== etape_code;
        });
        setData(ndata);
      },
      icon: Trash2,
    },
    {
      label: "Students",
      value: "showstudents",
      callback: (etapeCode: string) =>
        screenSelectedHandler &&
        screenSelectedHandler("StudentsData", etapeCode),
      icon: SquareArrowOutUpRight,
    },
  ];

  useEffect(() => {
    if (data.length > 0) {
      setColumns(Object.keys(data[0]));
    }
  }, [data]);
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
          <MapFileData data={data} options={options} />
        </TableBody>
      </Table>
      <UCDAlertDialog
        message={deleteMessageDialog}
        confirmAction={() => console.log("Deleted")}
        deleteDialog={deleteDialog}
        setDeleteAlert={setDeleteAlert}
      />
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
