import { initialSidebarList } from "@/constants/sidebar";
import { Screen, isScreens } from "@/enums/Screens";
import { SidebarItemType } from "@/types/sidebarItem";
import { ReactNode, createContext, useState } from "react";

type TabsContextType = {
  itemSelected: SidebarItemType | null;
  navigateTo: (screen: Screen | SidebarItemType) => void;
};

const TabsContextInitValue = {
  itemSelected: null,
  navigateTo: () => {},
};

export const TabsContext = createContext<TabsContextType>(TabsContextInitValue);

type TabsContextProps = {
  children: ReactNode;
};

export function TabsProvider({ children }: TabsContextProps) {
  const [itemSelected, setItemSelected] = useState<SidebarItemType>(
    initialSidebarList[0]
  );

  function navigateTo(screen: Screen | SidebarItemType) {
    if (isScreens(screen)) {
      switch (screen) {
        case Screen.Students:
          setItemSelected(initialSidebarList[0]);
          break;

        case Screen.Profs:
          setItemSelected(initialSidebarList[1]);
          break;

        default:
          break;
      }
    } else setItemSelected(screen as SidebarItemType);
  }

  const defaultValue = {
    itemSelected,
    navigateTo,
  };
  return (
    <TabsContext.Provider value={defaultValue}>{children}</TabsContext.Provider>
  );
}
