import { EtapeDataType } from "@/types/EtapeDataType";
import { setStateType } from "@/types/setState";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { ToastError } from "@/lib/ToastError";

export function searchEtapes(
  setData: setStateType<EtapeDataType[]>,
  search_query: string,
  pageLength: number,
  pageNum: number
) {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  axios
    .get(
      `${HOST_LINK}etapes/search/?q=${search_query}&skip=${
        pageLength * (pageNum - 1)
      }&take=${pageLength}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((res: AxiosResponse) => {
      if (res.data) setData(res.data);
      else setData([]);
    })
    .catch((err: AxiosError) => {
      ToastError((err.response?.data as { message: string }).message);
    });
}
