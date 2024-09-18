import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { UserInfoType } from "@/types/UserInfo";
import { ServiceRequestType } from "@/types/serviceRequestDataType";

export async function addStdServicerequest(demandeData: ServiceRequestType) {
  const access_token = ls.getAccessToken();
  const userInfo: UserInfoType = ls.userInfo();
  if (access_token.length == 0 || userInfo.user_id.length == 0)
    handleUnauthorized();
  try {
    demandeData.user_id = userInfo.user_id;
    const response: AxiosResponse = await axios.post(
      `${HOST_LINK}demandes`,
      {
        ...demandeData,
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
