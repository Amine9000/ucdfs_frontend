import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { handleUnauthorized } from "@/lib/utils";
import { ls } from "@/lib/LocalStorage";

export async function updateState(std_srvice_id: string, state: string) {
  if (state.length > 0 && std_srvice_id.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.patch(
        `${HOST_LINK}demandes/${std_srvice_id}`,
        {
          state,
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
