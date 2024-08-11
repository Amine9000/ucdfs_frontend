import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { Demande } from "@/types/Demande";

export async function addService(service: Demande) {
  if (service.name.length > 0 && service.description.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.post(
        `${HOST_LINK}services`,
        {
          ...service,
        },
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
