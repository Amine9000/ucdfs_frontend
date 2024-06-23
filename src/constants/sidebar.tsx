import { Profile } from "@/features/profile/Profile";
import { ValidationList } from "@/features/validationList/ValidationList";
import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import { Bolt, ClipboardList, Settings, User } from "lucide-react";

export const initialSidebarList: SidebarItemType[] = [
  {
    label: "students",
    icon: ClipboardList,
    element: <ValidationList />,
  },
  {
    label: "profs needs",
    icon: Bolt,
    element: <div>profs needs</div>,
  },
];

export const profileList: SidebarItemType[] = [
  {
    label: "parameters",
    icon: Settings,
    element: <div>parameters</div>,
  },
  {
    label: "profile",
    icon: User,
    element: <Profile />,
  },
];

export const initialSidebarSections: SidebarSectionType[] = [
  {
    id: "1",
    title: "Menu",
    items: initialSidebarList,
    position: Position.TOP,
  },
  {
    id: "2",
    title: "help",
    items: profileList,
    position: Position.BOTTOM,
  },
];
