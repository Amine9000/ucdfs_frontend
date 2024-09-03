import {
  bottomList,
  initialSidebarSections,
  selectSidebar,
  topList,
} from "@/constants/sidebar";
import { Screen, isScreen } from "@/enums/Screens";
import { ls } from "@/lib/LocalStorage";
import { setStateType } from "@/types/setState";
import { SidebarItemType } from "@/types/sidebarItem";
import { SidebarSectionType } from "@/types/sidebarSection";
import { ReactNode, createContext, useEffect, useState } from "react";

type TabsContextType = {
  data: object;
  setData: setStateType<object>;
  itemSelected: SidebarItemType | null;
  setSidebarState: setStateType<SidebarSectionType[]>;
  sidebarState: SidebarSectionType[];
  navigateTo: (screen: Screen | SidebarItemType) => void;
};

const TabsContextInitValue = {
  data: {},
  setData: () => {},
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
  const [data, setData] = useState<object>({});

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

  function navigateTo(screen: Screen | SidebarItemType, data?: object) {
    if (isScreen(screen)) {
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
          for (
            let sectionIndex = 0;
            sectionIndex < initialSidebarSections.length;
            sectionIndex++
          ) {
            const section = initialSidebarSections[sectionIndex];
            for (
              let itemIndex = 0;
              itemIndex < section.items.length;
              itemIndex++
            ) {
              const item = section.items[itemIndex];
              if (item.children)
                for (
                  let childIndex = 0;
                  childIndex < item.children.length;
                  childIndex++
                ) {
                  const child = item.children[childIndex];
                  if (child.title == (screen as string)) {
                    setItemSelected({
                      ...item,
                      element: child.element,
                    } as SidebarItemType);
                    break;
                  }
                }
            }
          }
          break;
      }
    } else setItemSelected(screen as SidebarItemType);
    if (data) setData(data);
  }

  const defaultValue = {
    data,
    setData,
    itemSelected,
    sidebarState,
    setSidebarState,
    navigateTo,
  };
  return (
    <TabsContext.Provider value={defaultValue}>{children}</TabsContext.Provider>
  );
}
