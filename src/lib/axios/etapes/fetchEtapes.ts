import { UserInfoType } from "@/types/UserInfo";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ToastError } from "@/lib/ToastError";

export async function fetchEtapes() {
  const studentsInfo: UserInfoType = ls.userInfo();
  const access_token = ls.getAccessToken();
  if (!studentsInfo.user_email || access_token.length == 0)
    handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(`${HOST_LINK}etapes/all`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    const err = error as AxiosError;
    ToastError((err.response?.data as { message: string }).message);
  }
}
