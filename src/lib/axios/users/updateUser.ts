import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { UserDto } from "@/types/user/UserDto";
import { ToastError } from "@/lib/ToastError";

export async function updateUser(userId: string, userDto: UserDto) {
  if (userId.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.patch(
        `${HOST_LINK}users/${userId}`,
        {
          user_fname: userDto.prenom,
          user_lname: userDto.nom,
          user_email: userDto.email,
          user_password: userDto.pwd,
          user_roles: userDto.roles,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (
        response.status == 200 ||
        response.status == 201 ||
        response.status == 202
      )
        return response.data;
    } catch (error) {
      const err = error as AxiosError;
      ToastError((err.response?.data as { message: string }).message);
    }
  }
  return null;
}
