import { FileColumnNames } from "@/types/FileColumnNames";
import { FileDataItem } from "@/types/FileDataItem";
import { setStateType } from "@/types/setState";
import axios, { AxiosError, AxiosResponse } from "axios";

export function getStudentsByEtape(
  setData: setStateType<FileColumnNames[]>,
  pageLength: number,
  pageNum: number,
  etape_code?: string
) {
  if (etape_code) {
    const access_token = localStorage.getItem("access_token") ?? "";
    axios
      .get(
        `http://localhost:3000/students/etape/${etape_code}?skip=${
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

export function getStudentsValidationByEtape(
  setData: setStateType<FileColumnNames[]>,
  pageLength: number,
  pageNum: number,
  etape_code?: string
) {
  if (etape_code) {
    const access_token = localStorage.getItem("access_token") ?? "";
    axios
      .get(
        `http://localhost:3000/students/validation/${etape_code}?skip=${
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
        console.error(err.message);
      });
  }
}

export async function getEtapes(pageNum: number, pageLength: number) {
  try {
    const access_token = localStorage.getItem("access_token") ?? "";
    const responce = await axios.get(
      `http://localhost:3000/etapes?skip=${
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

export async function getProccessedDataFile(
  semester: string,
  groupNum: number
) {
  if (semester) {
    try {
      const access_token = localStorage.getItem("access_token") ?? "";
      const res = await axios.post(
        `http://localhost:3000/files/download/${semester}`,
        {
          groupNum,
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
      // console.error(
      //   "There has been a problem with your fetch operation:",
      //   error
      // );
    }
  }
}

export function search(
  setData: setStateType<FileColumnNames[]>,
  search_query: string,
  pageLength: number,
  pageNum: number,
  etape_code?: string
) {
  if (etape_code) {
    const access_token = localStorage.getItem("access_token") ?? "";
    axios
      .get(
        `http://localhost:3000/students/search/${etape_code}?q=${search_query}&skip=${
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

export function searchEtapes(
  setData: setStateType<FileDataItem[]>,
  search_query: string,
  pageLength: number,
  pageNum: number
) {
  const access_token = localStorage.getItem("access_token") ?? "";
  axios
    .get(
      `http://localhost:3000/etapes/search/?q=${search_query}&skip=${
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

function handleUnauthorized() {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}
