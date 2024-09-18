import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import { HOST_LINK } from "@/constants/host";
import { ToastError } from "@/lib/ToastError";
import { UserInfoType } from "@/types/UserInfo";

export async function changePwdReqUser(password: string) {
  const userInfo: UserInfoType = ls.userInfo();
  const access_token = ls.getAccessToken();
  if (
    access_token.length == 0 ||
    !userInfo.user_id ||
    userInfo.user_id.length == 0
  )
    handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.patch(
      `${HOST_LINK}users/${userInfo.user_id}/change`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.data) return response.data;
  } catch (error) {
    const err = error as AxiosError;
    ToastError((err.response?.data as { message: string }).message);
  }
  return {};
}
