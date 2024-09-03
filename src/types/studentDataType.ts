export type StudentDataType = {
  id?: string;
  student_code: string;
  student_fname: string;
  student_lname: string;
  student_cne: string;
  student_cin: string;
  student_birthdate: string;
  student_pwd: string;
  modules?: string[];
  is_first_login?: boolean;
  student_avatar_path?: string;
};
