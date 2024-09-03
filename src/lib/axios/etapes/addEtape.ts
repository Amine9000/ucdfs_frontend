import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import { HOST_LINK } from "@/constants/host";
import { ToastError } from "@/lib/ToastError";

export async function addEtape(etape_code: string, etape_name: string) {
  if (etape_code.length > 0 && etape_name.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.post(
        `${HOST_LINK}etapes`,
        {
          etape_code,
          etape_name,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response && response.status === 201 && response.data) {
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      ToastError((err.response?.data as { message: string }).message);
    }
  }
  return null;
}
