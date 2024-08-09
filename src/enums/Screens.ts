import { initialSidebarSections } from "@/constants/sidebar";

export enum Screen {
  Students = "Students",
  Profs = "Profs",
  Profile = "Profile",
  Setting = "Setting",
  Notifications = "Notifications",
  validation = "Validation",
  StudentsData = "StudentsData",
  EtapeList = "EtapeList",
}

export function isScreen(screen: unknown) {
  const isParentScreen = Object.values(Screen).includes(screen as Screen);
  const isChildScreen = initialSidebarSections.some((section) =>
    section.items.some((item) =>
      item.children?.some((child) => child.title == screen)
    )
  );
  return isParentScreen || isChildScreen;
}
