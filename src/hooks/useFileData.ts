import { FileDataContext } from "@/context/FileData";
import { useContext } from "react";

export function useFileData() {
  const contextValue = useContext(FileDataContext);
  return contextValue;
}
