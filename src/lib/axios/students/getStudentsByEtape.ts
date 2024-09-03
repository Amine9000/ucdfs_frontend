import { setStateType } from "@/types/setState";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HOST_LINK } from "@/constants/host";
import { DataRecord } from "@/types/DataRecord";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";

export function getStudentsByEtape(
  setData: setStateType<DataRecord[]>,
  pageLength: number,
  pageNum: number,
  etape_code?: string
) {
  if (etape_code) {
    const access_token = ls.getAccessToken();
    if (access_token.length == 0) handleUnauthorized();
    axios
      .get(
        `${HOST_LINK}students/etape/${etape_code}?skip=${
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
        console.error("axios error", err.message);
      });
  }
}
