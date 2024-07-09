import { UnderConstruction } from "@/components/UnderConstruction";
import { Roles } from "@/enums/Roles";
import { StudentsValidationTab } from "@/features/StudentsValidation/StudentsValidation";
import { Notifications } from "@/features/notifications/Notifications";
import { Profile } from "@/features/profile/Profile";
import { ValidationList } from "@/features/validationList/ValidationList";
import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import {
  Bell,
  ClipboardList,
  HandPlatter,
  ListChecks,
  Settings,
  User,
} from "lucide-react";

export const topList: SidebarItemType[] = [
  {
    label: "students",
    icon: ClipboardList,
    element: <ValidationList />,
    roles: [Roles.STUDENTS_MANAGER],
    hidden: false,
  },
  {
    label: "profs needs",
    icon: HandPlatter,
    element: <UnderConstruction pageName="Profs Service" />,
    roles: [Roles.ADMIN],
    hidden: false,
  },
  {
    label: "Notifications",
    icon: Bell,
    element: <Notifications />,
    roles: [],
    hidden: false,
  },
  {
    label: "validation",
    icon: ListChecks,
    element: <StudentsValidationTab />,
    roles: [],
    hidden: true,
  },
];

export const bottomList: SidebarItemType[] = [
  {
    label: "parameters",
    icon: Settings,
    element: <UnderConstruction pageName="parameters" />,
    roles: [Roles.ADMIN, Roles.STUDENTS_MANAGER],
    hidden: false,
  },
  {
    label: "profile",
    icon: User,
    element: <Profile />,
    roles: [Roles.ADMIN, Roles.STUDENTS_MANAGER],
    hidden: false,
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
    sidebarSection.items = sidebarSection.items.filter(
      (item) =>
        !item.hidden &&
        (item.roles.length == 0 ||
          item.roles.some((role) => roles.includes(role)))
    );
  });
  console.log(sidebarSections);
  return sidebarSections;
}
