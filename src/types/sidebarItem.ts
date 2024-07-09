import { Roles } from "@/enums/Roles";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";

export type SidebarItemType = {
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  element: ReactElement;
  roles: Roles[];
  hidden: boolean;
};
