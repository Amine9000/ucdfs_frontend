import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";

export type SidebarItemType = {
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  element: ReactElement;
};
