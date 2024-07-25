import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import { HOST_LINK } from "@/constants/host";
import { StudentDataType } from "@/types/studentDataType";

export async function addStudent(studentData: StudentDataType) {
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
    return response;
  } catch (error) {
    const err = error as AxiosError;
    console.error("axios error", err.message);
  }
}
