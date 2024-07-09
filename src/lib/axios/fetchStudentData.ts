import { UserInfoType } from "@/types/UserInfo";
import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";

export async function getStudentSemesters() {
  const studentsInfo: UserInfoType = ls.userInfo();
  const access_token = ls.getAccessToken();
  if (!studentsInfo.user_email || access_token.length == 0)
    handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(
      `${HOST_LINK}students/${"k132321124"}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("response", response);
  } catch (error) {
    console.error(error);
  }
}
