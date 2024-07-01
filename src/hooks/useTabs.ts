import { TabsContext } from "@/context/Tabs";
import { useContext } from "react";

export function useTabs() {
  const contextValue = useContext(TabsContext);
  if (!contextValue)
    throw new Error("useTabs hook must be uset inside a TabsProvider.");
  return contextValue;
}
