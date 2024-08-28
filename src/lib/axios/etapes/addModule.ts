import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import { HOST_LINK } from "@/constants/host";

export async function addModule(
  module_name: string,
  module_code: string,
  etape_codes: string[]
) {
  if (module_code.length > 0 && module_name.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.post(
        `${HOST_LINK}modules`,
        {
          module_name,
          module_code,
          etape_codes,
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
