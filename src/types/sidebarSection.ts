import { SidebarItemType } from "./sidebarItem";

export enum Position {
  TOP = "top",
  BOTTOM = "bottom",
}

export type SidebarSectionType = {
  id: string;
  title: string;
  items: SidebarItemType[];
  position: Position;
};
