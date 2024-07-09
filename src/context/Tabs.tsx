import { bottomList, selectSidebar, topList } from "@/constants/sidebar";
import { Screen, isScreens } from "@/enums/Screens";
import { ls } from "@/lib/LocalStorage";
import { setStateType } from "@/types/setState";
import { SidebarItemType } from "@/types/sidebarItem";
import { SidebarSectionType } from "@/types/sidebarSection";
import { ReactNode, createContext, useEffect, useState } from "react";

type TabsContextType = {
  itemSelected: SidebarItemType | null;
  setSidebarState: setStateType<SidebarSectionType[]>;
  sidebarState: SidebarSectionType[];
  navigateTo: (screen: Screen | SidebarItemType) => void;
};

const TabsContextInitValue = {
  itemSelected: null,
  sidebarState: [],
  setSidebarState: () => {},
  navigateTo: () => {},
};

export const TabsContext = createContext<TabsContextType>(TabsContextInitValue);

type TabsContextProps = {
  children: ReactNode;
};

export function TabsProvider({ children }: TabsContextProps) {
  const [itemSelected, setItemSelected] = useState<SidebarItemType | null>(
    null
  );
  const [sidebarState, setSidebarState] = useState<SidebarSectionType[]>([]);

  useEffect(() => {
    const roles = ls.roles();
    if (roles) setSidebarState(selectSidebar(roles));
  }, []);

  useEffect(() => {
    const firstItem = sidebarState?.[0]?.items?.[0];
    if (firstItem) {
      setItemSelected(firstItem);
    }
  }, [sidebarState]);

  function navigateTo(screen: Screen | SidebarItemType) {
    if (isScreens(screen)) {
      switch (screen) {
        case Screen.Students:
          setItemSelected(topList[0]);
          break;

        case Screen.Profs:
          setItemSelected(topList[1]);
          break;

        case Screen.Profile:
          setItemSelected(bottomList[1]);
          break;

        case Screen.Setting:
          setItemSelected(bottomList[0]);
          break;

        case Screen.validation:
          setItemSelected(topList[3]);
          break;

        case Screen.Notifications:
          setItemSelected(topList[2]);
          break;

        default:
          break;
      }
    } else setItemSelected(screen as SidebarItemType);
  }

  const defaultValue = {
    itemSelected,
    sidebarState,
    setSidebarState,
    navigateTo,
  };
  return (
    <TabsContext.Provider value={defaultValue}>{children}</TabsContext.Provider>
  );
}
