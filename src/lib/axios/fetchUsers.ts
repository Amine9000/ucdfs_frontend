import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import axios, { AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";

export async function fetchUsers() {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const response: AxiosResponse = await axios.get(`${HOST_LINK}users`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (Array.isArray(response.data)) return response.data;
    else return [];
  } catch (error) {
    console.error(error);
  }
}
