export type ServiceRequestType = {
  service_id: string;
  user_id: string;
  fieldsValues?: FieldValue[];
};

export type FieldValue = {
  field_id?: number;
  value?: string | number | Date | boolean;
};
