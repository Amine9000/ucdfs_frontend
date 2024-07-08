import { Roles } from "@/enums/Roles";
import { Profile } from "@/features/profile/Profile";
import { ValidationList } from "@/features/validationList/ValidationList";
import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import { Bolt, ClipboardList, Settings, User } from "lucide-react";

export const topList: SidebarItemType[] = [
  {
    label: "students",
    icon: ClipboardList,
    element: <ValidationList />,
    roles: [Roles.STUDENTS_MANAGER],
  },
  {
    label: "profs needs",
    icon: Bolt,
    element: <div>profs needs</div>,
    roles: [Roles.ADMIN],
  },
];

export const bottomList: SidebarItemType[] = [
  {
    label: "parameters",
    icon: Settings,
    element: <div>parameters</div>,
    roles: [Roles.ADMIN, Roles.STUDENTS_MANAGER],
  },
  {
    label: "profile",
    icon: User,
    element: <Profile />,
    roles: [Roles.ADMIN, Roles.STUDENTS_MANAGER],
  },
];

export const initialSidebarSections: SidebarSectionType[] = [
  {
    id: "1",
    title: "Menu",
    items: topList,
    position: Position.TOP,
  },
  {
    id: "2",
    title: "help",
    items: bottomList,
    position: Position.BOTTOM,
  },
];

export function selectSidebar(roles: Roles[]) {
  const sidebarSections = initialSidebarSections;
  sidebarSections.forEach((sidebarSection) => {
    sidebarSection.items = sidebarSection.items.filter((item) =>
      item.roles.some((role) => roles.includes(role))
    );
  });
  console.log(sidebarSections);
  return sidebarSections;
}
