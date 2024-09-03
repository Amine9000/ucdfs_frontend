import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ToastError } from "@/lib/ToastError";

export async function fetchRoles() {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(`${HOST_LINK}roles`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status == 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError;
    ToastError((err.response?.data as { message: string }).message);
  }
  return [];
}
