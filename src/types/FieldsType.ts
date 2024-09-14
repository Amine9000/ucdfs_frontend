export type FieldType = "text" | "textarea" | "number" | "date" | "boolean";

export interface FieldsType {
  id?: number;
  name: string;
  type: FieldType;
  required: boolean;
  min?: number;
  max?: number;
  value?: string | number | Date | boolean;
}
