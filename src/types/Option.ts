import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { setStateType } from "./setState";
import { EtapeDataType } from "./EtapeDataType";
import { DataRecord } from "./DataRecord";

export type Option = {
  label: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  callback: (
    value: string,
    data?: DataRecord | EtapeDataType,
    setError?: setStateType<string>
  ) => Promise<void> | Promise<unknown> | void | null;
};
