import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import { HOST_LINK } from "@/constants/host";

/**
  student_code: string;
  student_fname: string;
  student_lname: string;
  student_cne: string;
  student_cin: string;
  student_pwd: string;
  student_birthdate: string;
  modules: { module_code: string; etape_code: string }[]; 
 */

export type StudentDto = {
  id?: string;
  student_code: string;
  student_fname: string;
  student_lname: string;
  student_cne: string;
  student_cin: string;
  student_birthdate: string;
  student_pwd: string;
  modules: { module_code: string; etape_code: string }[];
};

export type addStudentRes = {
  message: string;
  status: number;
  user: {
    id: string;
    student_code: string;
    student_cne: string;
    student_cin: string;
    student_pwd: string;
    student_fname: string;
    student_lname: string;
    student_birthdate: string;
  };
};
export async function addStudent(
  studentData: StudentDto
): Promise<addStudentRes | null> {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.post(
      `${HOST_LINK}students`,
      {
        ...studentData,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 201 || response.status === 200)
      return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("axios error", err.message);
  }
  return null;
}
