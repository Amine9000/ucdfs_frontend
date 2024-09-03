import axios, { AxiosError } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";

export async function getEtapes(pageNum: number, pageLength: number) {
  try {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    if (pageNum <= 0) pageNum = 1;
    const responce = await axios.get(
      `${HOST_LINK}etapes?skip=${
        pageLength * (pageNum - 1)
      }&take=${pageLength}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (responce.data) {
      return responce.data;
    } else return [];
  } catch (err: unknown) {
    const error = err as AxiosError;
    if (error.response?.status == 401) handleUnauthorized();
    return [];
  }
}
