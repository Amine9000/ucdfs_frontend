import { UsersProvider } from "@/context/users";
import { UsersList } from "./UsersList";
import { UsersNavbar } from "./UsersNavbar";

export function UsersTab() {
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <UsersProvider>
        <UsersNavbar />
        <UsersList />
      </UsersProvider>
    </div>
  );
}
