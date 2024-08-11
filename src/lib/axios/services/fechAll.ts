import { UserInfoType } from "@/types/UserInfo";
import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";

export async function fetchServices() {
  const studentsInfo: UserInfoType = ls.userInfo();
  const access_token = ls.getAccessToken();
  if (!studentsInfo.user_email || access_token.length == 0)
    handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(`${HOST_LINK}services`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response);
    if (response.data) return response.data;
    else return [];
  } catch (error) {
    console.error(error);
  }
}
