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
import { useUsers } from "@/hooks/useUsers";
import { deleteUser } from "@/lib/axios/users/deleteUser";
import { UserDto } from "@/types/user/UserDto";
import { UserOption } from "@/types/UserOption";
import { Cog, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UserOptionsSheet } from "./UserOptionsSheet";
import toast from "react-hot-toast";
import { regenerateUserPwd } from "@/lib/axios/users/regenrateUserPwd";
import { PasswordToast } from "@/components/validationList/StudentsData/PasswordToast";

const deleteUserCallback = (id: string) => {
  deleteUser(id);
};

const regeneratePasswordCallback = (id: string) => {
  handleRegeneratePassword(id);
};

async function handleRegeneratePassword(id: string) {
  try {
    const data: { password: string; message: string } = await regenerateUserPwd(
      id
    );

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

const options: UserOption[] = [
  {
    label: "Modifier l'utilisateur",
    icon: PencilLine,
    value: "update",
    callback: () => {}, // this logic is moved to => UpdateUserDialog
  },
  {
    label: "Supprimer un utilisateur",
    icon: Trash2,
    value: "delete",
    callback: deleteUserCallback,
  },
  {
    label: "Regenerer le mot de passe",
    icon: Cog,
    value: "regeneratepwd",
    callback: regeneratePasswordCallback,
  },
];

export function UsersList() {
  const [columns, setColumns] = useState<string[]>([]);
  const { users } = useUsers();

  useEffect(() => {
    if (Array.isArray(users) && users.length) {
      const cols = Object.keys(users[0] ?? {}).filter((col) => col !== "id");
      setColumns(cols);
    }
  }, [users]);

  return (
    <div className="w-full h-full bg-white rounded overflow-auto">
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
            <TableHead className="text-slate-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user, index) => <UserTableRow key={index} user={user} />)
          ) : (
            <TableRow>
              <TableCell
                className="text-sm text-sky-700 text-center"
                colSpan={columns.length + 1}
              >
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface UserTableRowProps {
  user: UserDto;
}

function UserTableRow({ user }: UserTableRowProps) {
  return (
    <TableRow className="cursor-pointer py-1 group/row">
      {Object.entries(user).map(([key, val], index) => {
        if (key === "id") return null;
        return <UserTableCell key={index} keyName={key} value={val} />;
      })}
      <TableCell>
        <UserOptionsSheet options={options} data={user}>
          <EllipsisVertical className="text-slate-600" />
        </UserOptionsSheet>
      </TableCell>
    </TableRow>
  );
}

interface UserTableCellProps {
  keyName: string;
  value: string | number | string[];
}

function UserTableCell({ keyName, value }: UserTableCellProps) {
  if (keyName === "roles") {
    return (
      <TableCell className="text-sm text-slate-700 flex flex-wrap gap-2">
        {(value as string[]).map((role, index) => (
          <div
            key={index}
            className="w-auto bg-purple-50 rounded-sm py-1 px-4 text-sm text-purple-800"
          >
            {role}
          </div>
        ))}
      </TableCell>
    );
  }

  if (keyName === "avatar") {
    return (
      <TableCell className="text-sm text-slate-700">
        <div className="size-8 group-hover/row:scale-[1.6] rounded-sm transition-all duration-300 overflow-hidden">
          <img
            className="h-full w-auto"
            src={`${HOST_LINK}static/${value}`}
            alt="avatar"
          />
        </div>
      </TableCell>
    );
  }

  return <TableCell className="text-sm text-slate-700">{value}</TableCell>;
}
