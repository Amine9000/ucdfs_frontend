import axios, { AxiosError } from "axios";
import { ls } from "../../LocalStorage";
import { handleUnauthorized } from "../../utils";
import { HOST_LINK } from "@/constants/host";
import { ToastError } from "../../ToastError";

export async function meregerBranchs(
  branches_codes: string[],
  branchName: string,
  codeBranch: string
) {
  if (branches_codes) {
    try {
      const access_token = ls.getAccessToken();
      if (access_token.length == 0) handleUnauthorized();
      const res = await axios.post(
        `${HOST_LINK}etapes/merge`,
        {
          etape_codes: branches_codes,
          branchName,
          codeBranch,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (res.data && Array.isArray(res.data)) return res.data;
    } catch (error) {
      const err = error as AxiosError;
      ToastError(
        (err.response?.data as { message: string }).message ?? err.message
      );
    }
  }
  return [];
}
