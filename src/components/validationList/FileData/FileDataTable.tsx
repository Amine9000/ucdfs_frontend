import { OptionsSheet } from "@/components/global/optionsSheet";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useFileData } from "@/hooks/useFileData";
import { deleteStudent } from "@/lib/axios/deleteStudent";
import { FileColumnNames } from "@/types/FileColumnNames";
import { Option } from "@/types/Option";
import { EllipsisVertical, Settings2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FileDataTableProps = {
  data: FileColumnNames[];
};

export function FileDataTable({ data }: FileDataTableProps) {
  const { data: userList, setData } = useFileData();
  const [columns, setColumns] = useState<string[]>([]);

  async function handleDeleteAction(cne: string) {
    try {
      const res: { message: string } = await deleteStudent(cne);
      const nData = userList.filter((std) => std["CNE"] != cne);
      setData(nData);
      toast.promise(Promise.resolve(res.message), {
        loading: "Deleting...",
        success: <small className="text-sm">{res.message}</small>,
        error: (
          <small className="text-sm">An error occurred while deleting.</small>
        ),
      });
    } catch (error) {
      toast.error("An error occurred while deleting.");
    }
  }

  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: () => console.log("Updated."),
      icon: Settings2,
    },
    {
      label: "Delete",
      value: "delete",
      callback: (cne: string) => handleDeleteAction(cne),
      icon: Trash2,
    },
    {
      label: "Regenerate Password",
      value: "regeneratepwd",
      callback: () => console.log("password regenerated."),
      icon: Trash2,
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
        <TableCaption>File content.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead className="text-slate-900" key={index}>
                {column}
              </TableHead>
            ))}
            <TableHead className="text-slate-900">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{MapFileData(data, options)}</TableBody>
      </Table>
    </>
  );
}

function MapFileData(data: FileColumnNames[], options: Option[]) {
  return data.map((student, index) => {
    return (
      <TableRow className="cursor-pointer py-1" key={index}>
        {Object.values(student).map((value, index) => {
          return (
            <TableCell className="text-sm text-slate-700" key={index}>
              {value}
            </TableCell>
          );
        })}
        <TableCell>
          <OptionsSheet options={options} data={student}>
            <EllipsisVertical className="text-slate-600" />
          </OptionsSheet>
        </TableCell>
      </TableRow>
    );
  });
}
