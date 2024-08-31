import { usersContext } from "@/context/users";
import { useContext } from "react";

export function useUsers() {
  const contextValue = useContext(usersContext);
  if (!contextValue)
    throw new Error("useUsers must be used within a UsersProvider");
  return contextValue;
}
