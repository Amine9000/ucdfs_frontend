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
import { useStudentsData } from "@/hooks/useStudentsData";
import { deleteStudent } from "@/lib/axios/deleteStudent";
import { updateStudent } from "@/lib/axios/updateStudent";
import { DataRecord } from "@/types/DataRecord";
import { Option } from "@/types/Option";
import { setStateType } from "@/types/setState";
import { Cog, EllipsisVertical, Settings2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PasswordToast } from "./PasswordToast";
import { regeneratePassword } from "@/lib/axios/regeneratePassword";

export function StudentsTable() {
  const { data: studentsList, setData, SVOption } = useStudentsData();
  const [columns, setColumns] = useState<string[]>([]);

  async function handleDeleteAction(cne: string) {
    try {
      const res: { message: string } = await deleteStudent(cne);
      const nData = studentsList.filter((std) => std["CNE"] != cne);
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

  async function handleUpdateAction(
    id: string,
    data?: DataRecord,
    setError?: setStateType<string>
  ) {
    try {
      const res = await updateStudent(id, data ?? {});
      if (res && res.status != 200 && setError) {
        setError(res.data.message);
      } else {
        const nData = studentsList.map((std) => {
          return std["id"] == id ? data : std;
        });
        setData(nData as DataRecord[]);
        toast.promise(Promise.resolve(res?.data.message), {
          loading: "Updating...",
          success: <small className="text-sm">Updated successfully</small>,
          error: (
            <small className="text-sm">An error occurred while updating.</small>
          ),
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting.");
    }
  }

  async function handleRegeneratePassword(code: string) {
    try {
      const data: { password: string; message: string } =
        await regeneratePassword(code);

      toast.promise(Promise.resolve(data.message), {
        loading: "Regenerating password...",
        success: (
          <small className="text-sm">Password regenerated successfully</small>
        ),
        error: (
          <small className="text-sm">
            An error occurred while regenerating the password.
          </small>
        ),
      });

      if (data && data.password) {
        toast.custom((t) => <PasswordToast t={t} password={data.password} />);
      } else {
        toast.error("An error occurred while regenerating the password.");
      }
    } catch (error) {
      toast.error("An error occurred while regenerating the password.");
    }
  }

  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: (
        cne: string,
        data?: DataRecord,
        setError?: setStateType<string>
      ) => handleUpdateAction(cne, data, setError),
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
      callback: (code: string) => {
        handleRegeneratePassword(code);
      },
      icon: Cog,
    },
  ];

  useEffect(() => {
    if (studentsList.length > 0) {
      setColumns(Object.keys(studentsList[0]).filter((key) => key != "id"));
    }
  }, [studentsList]);
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
            {SVOption != "validation" && (
              <TableHead className="text-slate-900">actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>{MapFileData(studentsList, options, SVOption)}</TableBody>
      </Table>
    </>
  );
}

function MapFileData(
  studentsList: DataRecord[],
  options: Option[],
  SVOption: string
) {
  return studentsList.map((student, index) => {
    return (
      <TableRow className="cursor-pointer py-1" key={index}>
        {Object.entries(student).map(([key, value], index) => {
          if (key == "id") return null;
          return (
            <TableCell className="text-sm text-slate-700" key={index}>
              {value}
            </TableCell>
          );
        })}
        {SVOption != "validation" && (
          <TableCell>
            <OptionsSheet options={options} data={student}>
              <EllipsisVertical className="text-slate-600" />
            </OptionsSheet>
          </TableCell>
        )}
      </TableRow>
    );
  });
}
