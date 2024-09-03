import { SearchForm } from "@/components/global/Search";
import { useEffect, useState } from "react";
import { AddUserDialog } from "./AddUserDialog";
import { searchUsers } from "@/lib/axios/users/searchUsers";
import { useUsers } from "@/hooks/useUsers";
import { fetchUsers } from "@/lib/axios/users/fetchUsers";

export function UsersNavbar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setUsers } = useUsers();

  async function fetchData() {
    if (searchQuery.length > 0) {
      const data = await searchUsers(searchQuery);
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } else {
      const data = await fetchUsers();
      if (Array.isArray(data) && data.length) {
        setUsers(data);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-2">
      <SearchForm
        className="w-[400px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="h-full w-auto flex items-center gap-2">
        {/* <Pagination pageNum={pageNum} setPageNum={setPageNum} more={morePage} /> */}
        <AddUserDialog />
      </div>
    </div>
  );
}
