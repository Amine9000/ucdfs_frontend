type FieldType = "string" | "number" | "date";

export interface FieldsType {
  name: string;
  type: FieldType;
  required: boolean;
  min?: number;
  max?: number;
}
