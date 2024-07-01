import { initialSidebarList } from "@/constants/sidebar";
import { setStateType } from "@/types/setState";
import { SidebarItemType } from "@/types/sidebarItem";
import { ReactNode, createContext, useState } from "react";

type TabsContextType = {
  itemSelected: SidebarItemType;
  setItemSelected: setStateType<SidebarItemType>;
};

const TabsContextInitValue = {
  itemSelected: initialSidebarList[0],
  setItemSelected: () => {},
};

export const TabsContext = createContext<TabsContextType>(TabsContextInitValue);

type TabsContextProps = {
  children: ReactNode;
};

export function TabsProvider({ children }: TabsContextProps) {
  const [itemSelected, setItemSelected] = useState<SidebarItemType>(
    initialSidebarList[0]
  );
  const defaultValue = {
    itemSelected,
    setItemSelected,
  };
  return (
    <TabsContext.Provider value={defaultValue}>{children}</TabsContext.Provider>
  );
}
