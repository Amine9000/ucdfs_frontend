import { UserInfoType } from "@/types/UserInfo";
import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { DemandeRequestType } from "@/types/serviceRequestType";

export async function fetchServiceRequests() {
  const studentsInfo: UserInfoType = ls.userInfo();
  const access_token = ls.getAccessToken();
  if (!studentsInfo.user_email || access_token.length == 0)
    handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(`${HOST_LINK}demandes`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.data) return response.data as DemandeRequestType[];
    else [];
  } catch (error) {
    console.error(error);
  }
}
