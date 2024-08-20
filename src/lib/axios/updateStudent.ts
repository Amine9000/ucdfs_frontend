import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import { HOST_LINK } from "@/constants/host";
import { DataRecord } from "@/types/DataRecord";

export async function updateStudent(id: string, studentData: DataRecord) {
  if (id.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.patch(
        `${HOST_LINK}students/${id}`,
        {
          student_code: studentData["Code"],
          student_fname: studentData["Prenom"],
          student_lname: studentData["Nom"],
          student_cne: studentData["CNE"],
          student_cin: studentData["CIN"],
          student_birthdate: studentData["Date Naissance"],
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response;
    } catch (error) {
      const err = error as AxiosError;
      console.error("axios error", err.message);
    }
  }
}
