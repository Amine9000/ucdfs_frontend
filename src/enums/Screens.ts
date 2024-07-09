export enum Screen {
  Students = "Students",
  Profs = "Profs",
  Profile = "Profile",
  Setting = "Setting",
  Notifications = "Notifications",
  validation = "Validation",
}

export function isScreens(screen: unknown) {
  return Object.values(Screen).includes(screen as Screen);
}
