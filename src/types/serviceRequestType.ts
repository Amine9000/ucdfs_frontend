import { Demande, Status } from "./Demande";
import { FieldsType } from "./FieldsType";
import { StudentDataType } from "./studentDataType";

type StudentServiceData = {
  id: string;
  value: string;
  field: FieldsType;
};

export type DemandeRequestType = {
  id: string;
  state: Status;
  created_at: string | Date;
  student: StudentDataType;
  service: Demande;
  studentServiceData: StudentServiceData[];
};
