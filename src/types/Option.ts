import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { setStateType } from "./setState";
import { FileColumnNames } from "./FileColumnNames";
import { FileDataItem } from "./FileDataItem";

export type Option = {
  label: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  callback: (
    value: string,
    data?: FileColumnNames | FileDataItem,
    setError?: setStateType<string>
  ) => Promise<void> | Promise<unknown> | void | null;
};
