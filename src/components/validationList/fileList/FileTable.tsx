import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { FileDataItem } from "@/types/FileDataItem";
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

type FileTableProps = {
  data: FileDataItem[];
  setData: setStateType<FileDataItem[]>;
};

const deleteMessageDialog: AlertMessageType = {
  title: "Delete File",
  description: "Are you sure you want to delete this file?",
  type: "error",
};

export function FileTable({ data, setData }: FileTableProps) {
  const { screenSelectedHandler } = useScreen();
  const [deleteDialog, setDeleteAlert] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: () => console.log("Updated"),
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
        screenSelectedHandler && screenSelectedHandler("fileData", etapeCode),
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
        <TableCaption>A list of your recent files.</TableCaption>
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
  data: FileDataItem[];
  options: Option[];
}) {
  return data.map((etape, index) => {
    return (
      <TableRow
        // onClick={() => {
        //   if (screenSelectedHandler != null)
        //     screenSelectedHandler("fileData", etape.code);
        // }}
        className="cursor-pointer"
        key={index}
      >
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
