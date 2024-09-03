import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { UserDto } from "@/types/user/UserDto";
import { ToastError } from "@/lib/ToastError";

export async function addUser(userData: UserDto) {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.post(
      `${HOST_LINK}users`,
      {
        user_fname: userData.prenom,
        user_lname: userData.nom,
        user_email: userData.email,
        user_password: userData.pwd,
        user_roles: userData.roles,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status == 201 && response.data.message) {
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError;
    ToastError((err.response?.data as { message: string }).message);
  }
  return null;
}
