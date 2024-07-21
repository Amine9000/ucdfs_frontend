import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import { HOST_LINK } from "@/constants/host";

export async function deleteEtape(etape_code: string) {
  if (etape_code.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.delete(
        `${HOST_LINK}etapes/${etape_code}`,
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
}
