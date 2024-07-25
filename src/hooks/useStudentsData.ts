import { StudentsDataContext } from "@/context/StudentsData";
import { useContext } from "react";

export function useStudentsData() {
  const contextValue = useContext(StudentsDataContext);
  return contextValue;
}
