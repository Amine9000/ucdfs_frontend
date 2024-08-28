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
import { HOST_LINK } from "@/constants/host";
import { fetchUsers } from "@/lib/axios/users/fetchUsers";
import { DataRecord } from "@/types/DataRecord";
import { EtapeDataType } from "@/types/EtapeDataType";
import { Option } from "@/types/Option";
import { setStateType } from "@/types/setState";
import { Cog, EllipsisVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function UsersList() {
  const [columns, setColumns] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([
    {
      label: "Modifier l'utilisateur",
      icon: Plus,
      value: "update",
      callback: function (
        value: string,
        data?: DataRecord | EtapeDataType | undefined,
        setError?: setStateType<string> | undefined
      ): void | Promise<void> | Promise<unknown> | null {
        throw new Error("Function not implemented.");
      },
    },
    {
      label: "Supprimer un utilisateur",
      icon: Trash2,
      value: "delete",
      callback: function (
        value: string,
        data?: DataRecord | EtapeDataType | undefined,
        setError?: setStateType<string> | undefined
      ): void | Promise<void> | Promise<unknown> | null {
        throw new Error("Function not implemented.");
      },
    },
    {
      label: "regenerer le mot de passe",
      icon: Cog,
      value: "regeratepwd",
      callback: function (
        value: string,
        data?: DataRecord | EtapeDataType | undefined,
        setError?: setStateType<string> | undefined
      ): void | Promise<void> | Promise<unknown> | null {
        throw new Error("Function not implemented.");
      },
    },
  ]);
  const [userssList, setUserssList] = useState<DataRecord[]>([]);

  async function getUsers() {
    const data = await fetchUsers();
    if (Array.isArray(data) && data.length) {
      const cols = Object.keys(data[0] ?? {});
      setColumns(cols);
      setUserssList(data);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="w-full h-full">
      <Table>
        <TableCaption>Liste des utilisateurs</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead
                className="text-slate-900 first-letter:uppercase"
                key={index}
              >
                {column}
              </TableHead>
            ))}
            <TableHead className="text-slate-900">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{MapUsersData(userssList, options)}</TableBody>
      </Table>
    </div>
  );
}

function MapUsersData(userssList: DataRecord[], options: Option[]) {
  return userssList.map((user, index) => {
    return (
      <TableRow className="cursor-pointer py-1 group/row" key={index}>
        {Object.keys(user).map((key, index) => {
          if (key == "roles")
            return (
              <TableCell
                className="text-sm text-slate-700 flex flex-wrap gap-2"
                key={index}
              >
                {(user[key] as string[]).map((role, index) => (
                  <div
                    key={index}
                    className="w-auto bg-purple-50 rounded-sm py-1 px-4 text-sm text-purple-800"
                  >
                    {role}
                  </div>
                ))}
              </TableCell>
            );
          if (key == "avatar")
            return (
              <TableCell className="text-sm text-slate-700" key={index}>
                <div className="size-8 group-hover/row:scale-[1.6] rounded-sm transition-all duration-300 overflow-hidden">
                  <img
                    className="h-full w-auto"
                    src={(HOST_LINK + "static/" + user[key]) as string}
                    alt="avatar"
                  />
                </div>
              </TableCell>
            );
          return (
            <TableCell className="text-sm text-slate-700" key={index}>
              {user[key]}
            </TableCell>
          );
        })}
        <TableCell>
          <OptionsSheet options={options} data={user}>
            <EllipsisVertical className="text-slate-600" />
          </OptionsSheet>
        </TableCell>
      </TableRow>
    );
  });
}
