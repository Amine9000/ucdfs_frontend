import { FieldsType } from "./FieldsType";

export enum Status {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  InProgress = "InProgress",
}

export interface Demande {
  numero?: string;
  name: string;
  description: string;
  date?: string;
  fields?: FieldsType[];
  status?: Status;
}
