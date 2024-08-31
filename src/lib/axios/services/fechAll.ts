import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";

export async function fetchServices() {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(`${HOST_LINK}services`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response.data);
    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
}
