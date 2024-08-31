import { fetchUsers } from "@/lib/axios/users/fetchUsers";
import { UserDto } from "@/types/user/UserDto";
import { createContext, HTMLAttributes, useEffect, useState } from "react";

type userContextType = {
  users: UserDto[];
  setUsers: (user: UserDto[]) => void;
};

export const usersContext = createContext<userContextType>({
  users: [],
  setUsers: () => {},
});

interface UsersProviderProps extends HTMLAttributes<HTMLDivElement> {}

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<UserDto[]>([]);

  // Fetch users data
  const getUsers = async () => {
    const data = await fetchUsers();
    if (Array.isArray(data) && data.length) {
      setUsers(data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const initValue = {
    users,
    setUsers,
  };
  return (
    <usersContext.Provider value={initValue}>{children}</usersContext.Provider>
  );
}
