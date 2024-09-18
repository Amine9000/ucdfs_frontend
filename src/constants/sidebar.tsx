import { EtapeListScreen } from "@/components/validationList/EtapesList/EtapeListScreen";
import { StudentsListScreen } from "@/components/validationList/StudentsData/StudentsListScreen";
import { Roles } from "@/enums/Roles";
import { StudentsValidationTab } from "@/features/StudentsValidation/StudentsValidation";
import { Notifications } from "@/features/notifications/Notifications";
import { Profile } from "@/features/profile/Profile";
import { Services } from "@/features/services/Services";
import { Paramerters } from "@/features/settings/Paramerters";
import { StdDemandes } from "@/features/stdDemandes/StdDemandes";
import { UsersTab } from "@/features/users/UsersTab";
import { ValidationList } from "@/features/validationList/ValidationList";
import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import {
  Archive,
  BellRing,
  Headset,
  ListChecks,
  MailCheck,
  Settings,
  User,
  Users,
} from "lucide-react";

export const topList: SidebarItemType[] = [
  {
    label: "Académie",
    icon: Archive,
    element: <ValidationList />,
    children: [
      {
        title: "EtapeList",
        element: <EtapeListScreen />,
      },
      {
        title: "StudentsData",
        element: <StudentsListScreen />,
      },
    ],
    roles: [Roles.STUDENTS_MANAGER, Roles.Admin],
    hidden: false,
  },
  {
    label: "Services",
    icon: Headset,
    element: <Services />,
    roles: [Roles.Admin, Roles.SERVICES_MANAGER],
    hidden: false,
  },
  {
    label: "Notifications",
    icon: BellRing,
    element: <Notifications />,
    roles: [],
    hidden: false,
  },
  {
    label: "validation",
    icon: ListChecks,
    element: <StudentsValidationTab />,
    roles: [Roles.Student],
    hidden: false,
  },
  {
    label: "demandes",
    icon: MailCheck,
    element: <StdDemandes />,
    roles: [Roles.Student, Roles.Professor],
    hidden: false,
  },
  {
    label: "utilisateurs",
    icon: Users,
    element: <UsersTab />,
    roles: [Roles.Admin, Roles.USERS_MANAGER],
    hidden: false,
  },
];

export const bottomList: SidebarItemType[] = [
  {
    label: "parameters",
    icon: Settings,
    element: <Paramerters />,
    roles: [],
    hidden: false,
  },
  {
    label: "profile",
    icon: User,
    element: <Profile />,
    roles: [],
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
  return sidebarSections;
}
