import { UCDSheet } from "@/components/global/UCDSheet";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { FileColumnNames } from "@/types/FileColumnNames";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

type FileDataTableProps = {
  data: FileColumnNames[];
};

export function FileDataTable({ data }: FileDataTableProps) {
  const [columns, setColumns] = useState<string[]>([]);
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
        <TableBody>{MapFileData(data)}</TableBody>
      </Table>
    </>
  );
}

function MapFileData(data: FileColumnNames[]) {
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
          <UCDSheet student={student}>
            <EllipsisVertical size={20} className="text-slate-700" />
          </UCDSheet>
        </TableCell>
      </TableRow>
    );
  });
}
