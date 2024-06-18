import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { setStateType } from "@/types/setState";
import { AlertMessageType } from "@/types/AlertMessage";
import { PopUpDialog } from "./PopUpDialog";
import { useScreen } from "@/hooks/useScreen";

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
          {MapFileData(
            data,
            setDeleteAlert,
            setUpdatePopUp,
            screenSelectedHandler
          )}
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

function MapFileData(
  data: FileDataItem[],
  setDeleteAlert: setStateType<boolean>,
  setUpdatePopUp: setStateType<boolean>,
  screenSelectedHandler: ((title: string, etape_code?: string) => void) | null
) {
  return data.map((etape, index) => {
    return (
      <TableRow
        onClick={() => {
          if (screenSelectedHandler != null)
            screenSelectedHandler("fileData", etape.code);
        }}
        className="cursor-pointer"
        key={index}
      >
        {Object.values(etape).map((value, index) => (
          <TableCell className="text-sm text-slate-700" key={index}>
            {value}
          </TableCell>
        ))}
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="text-slate-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdatePopUp(true);
                }}
              >
                update
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteAlert(true);
                }}
              >
                delete
              </DropdownMenuItem>
              <DropdownMenuItem>rename</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  });
}
