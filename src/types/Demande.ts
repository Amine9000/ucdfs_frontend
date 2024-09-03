import { FieldsType } from "./FieldsType";

export enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  InProgress = "in Progress",
}

export const statusColors = {
  [Status.Pending]: {
    background: "bg-yellow-50",
    text: "text-yellow-500",
  },
  [Status.Approved]: {
    background: "bg-green-50",
    text: "text-green-500",
  },
  [Status.Rejected]: {
    background: "bg-red-50",
    text: "text-red-500",
  },
  [Status.InProgress]: {
    background: "bg-blue-50",
    text: "text-blue-500",
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
