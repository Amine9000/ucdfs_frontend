import { FileColumnNames } from "@/types/FileColumnNames";
import { setStateType } from "@/types/setState";
import axios, { AxiosError, AxiosResponse } from "axios";

export function getFileContent(
  setData: setStateType<FileColumnNames[]>,
  etape_code?: string
) {
  if (etape_code) {
    axios
      .get(`http://localhost:3000/students/etape/${etape_code}`)
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .catch((err: AxiosError) => {
        console.error("axios error", err.message);
      });
  }
}

export function getProccessedFileContent(
  setData: setStateType<FileColumnNames[]>,
  etape_code?: string
) {
  if (etape_code) {
    axios
      .get(`http://localhost:3000/etapes/${etape_code}/validation`)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err: AxiosError) => {
        console.error(err.message);
      });
  }
}

export async function getFiles() {
  try {
    const responce = await axios.get("http://localhost:3000/etapes");
    return responce.data;
  } catch (err: unknown) {
    console.error("getFiles() failed. axios could not fetch the files.");
  }
}

export async function getProccessedDataFile(
  semester: string,
  groupNum: number,
  etape_code?: string
) {
  if (etape_code) {
    try {
      const res = await axios.post(
        `http://localhost:3001/file/download/${etape_code}`,
        {
          semester,
          groupNum,
        },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }
}
