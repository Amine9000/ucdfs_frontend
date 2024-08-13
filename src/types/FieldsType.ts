export type FieldType = "string" | "number" | "date";

export interface FieldsType {
  id?: number;
  name: string;
  type: FieldType;
  required: boolean;
  min?: number;
  max?: number;
}
