import { UsersList } from "./UsersList";
import { UsersNavbar } from "./UsersNavbar";

export function UsersTab() {
  return (
    <div className="flex flex-col gap-2 h-full w-full bg-white">
      <UsersNavbar />
      <UsersList />
    </div>
  );
}
