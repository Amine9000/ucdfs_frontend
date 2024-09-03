import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";

export async function deleteService(service_id: string) {
  if (service_id.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.delete(
        `${HOST_LINK}services/${service_id}`,
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
