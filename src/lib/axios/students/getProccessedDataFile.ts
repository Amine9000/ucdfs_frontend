import axios from "axios";
import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";

export async function getProccessedDataFile(
  semester: string,
  groupNum: number,
  outputType: string,
  sectionsNbr: number,
  session: "printemps" | "automne"
) {
  if (semester) {
    try {
      const access_token = ls.getAccessToken();
      if (access_token.length == 0) handleUnauthorized();
      const res = await axios.post(
        `${HOST_LINK}files/download/${semester}/${
          outputType == "excel" ? "excel" : "pdf"
        }`,
        {
          groupNum,
          sectionsNbr,
          session,
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
