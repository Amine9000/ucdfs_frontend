import { Demande, Status } from "./Demande";
import { FieldsType } from "./FieldsType";

type StudentServiceData = {
  id: string;
  value: string;
  field: FieldsType;
};

export type DemandeRequestType = {
  id: string;
  state: Status;
  created_at: string | Date;
  user: UserDataType;
  service: Demande;
  studentServiceData: StudentServiceData[];
};

type UserDataType = {
  user_id: string;
  user_fname: string;
  user_lname: string;
  user_email: string;
  student?: StudentData;
  user_password: string;
  modules?: string[];
  is_first_login?: boolean;
  user_avatar_path?: string;
  roles: { role_name: string }[];
};

type StudentData = {
  student_code: string;
  student_cne: string;
  student_cin: string;
  student_birthdate: string;
};
