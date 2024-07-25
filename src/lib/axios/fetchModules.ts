import { UserInfoType } from "@/types/UserInfo";
import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";

export async function fetchModules(semester: string) {
  if (semester.length > 0) {
    const studentsInfo: UserInfoType = ls.userInfo();
    const access_token = ls.getAccessToken();
    if (!studentsInfo.user_email || access_token.length == 0)
      handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.get(
        `${HOST_LINK}modules/all/${semester}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  } else return { data: [] };
}
