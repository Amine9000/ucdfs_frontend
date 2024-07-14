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
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { UCDAlertDialog } from "./Dialog";
import { AlertMessageType } from "@/types/AlertMessage";
import { PopUpDialog } from "./PopUpDialog";
import { useScreen } from "@/hooks/useScreen";
import { OptionsSheet } from "@/components/global/optionsSheet";
import { Option } from "@/types/Option";

type FileTableProps = {
  data: FileDataItem[];
};

const deleteMessageDialog: AlertMessageType = {
  title: "Delete File",
  description: "Are you sure you want to delete this file?",
  type: "error",
};

export function FileTable({ data }: FileTableProps) {
  const { screenSelectedHandler } = useScreen();
  const [deleteDialog, setDeleteAlert] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: () => console.log("Updated"),
    },
    {
      label: "Delete",
      value: "delete",
      callback: () => console.log("Deleted"),
    },
    {
      label: "Students",
      value: "students",
      callback: (etapeCode: string) =>
        screenSelectedHandler && screenSelectedHandler("fileData", etapeCode),
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
      <PopUpDialog open={updatePopUp} setOpen={setUpdatePopUp} />
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
