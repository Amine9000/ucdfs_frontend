import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import { HOST_LINK } from "@/constants/host";
import { EtapeDataType } from "@/types/EtapeDataType";
import { ToastError } from "@/lib/ToastError";

export async function updateEtape(etape_code: string, etape: EtapeDataType) {
  if (etape_code.length > 0) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    try {
      const response: AxiosResponse = await axios.patch(
        `${HOST_LINK}etapes/${etape_code}`,
        {
          etape_code: etape.code,
          etape_name: etape.nom,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response && response.data) return response.data;
    } catch (error) {
      const err = error as AxiosError;
      ToastError((err.response?.data as { message: string }).message);
    }
  }
  return null;
}
