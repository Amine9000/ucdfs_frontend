import axios from "axios";
import { ls } from "../LocalStorage";
import { handleUnauthorized } from "../utils";
import { HOST_LINK } from "@/constants/host";

export async function meregerBranchs(
  branches_codes: string[],
  branchName: string
) {
  if (branches_codes) {
    try {
      const access_token = ls.getAccessToken();
      if (access_token.length == 0) handleUnauthorized();
      const res = await axios.post(
        `${HOST_LINK}files/download/etapes`,
        {
          etape_codes: branches_codes,
          branchName,
        },
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (res.data) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.dir(error);
    }
  }
}
