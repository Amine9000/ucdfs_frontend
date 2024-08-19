import { FieldsType } from "./FieldsType";

export enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  InProgress = "in Progress",
}

export const statusColors = {
  [Status.Pending]: {
    background: "bg-yellow-100",
    text: "text-yellow-700",
  },
  [Status.Approved]: {
    background: "bg-green-100",
    text: "text-green-700",
  },
  [Status.Rejected]: {
    background: "bg-red-100",
    text: "text-red-700",
  },
  [Status.InProgress]: {
    background: "bg-blue-100",
    text: "text-blue-700",
  },
};

export interface Demande {
  id?: string;
  name: string;
  description: string;
  date?: string;
  fields: FieldsType[] | undefined;
  status?: Status;
}
