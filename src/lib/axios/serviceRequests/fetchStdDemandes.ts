import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { UserInfoType } from "@/types/UserInfo";
import { DemandeRequestType } from "@/types/serviceRequestType";

export async function fetchStdDemandes() {
  const access_token = ls.getAccessToken();
  const stdInfo: UserInfoType = ls.userInfo();
  if (access_token.length == 0 || stdInfo.user_id.length == 0)
    handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(
      `${HOST_LINK}demandes/${stdInfo.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
  return [] as DemandeRequestType[];
}
