import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";

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
    console.log(error);
    // ToastError(error.message as string);
  }
  return [];
}
