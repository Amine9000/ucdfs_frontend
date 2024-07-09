import axios, { AxiosResponse } from "axios";
import { ls } from "../LocalStorage";
import { HOST_LINK } from "@/constants/host";

export async function uploadFile(file: string | Blob) {
  const formData = new FormData();
  formData.append("file", file);
  const access_token = ls.getAccessToken();
  try {
    const response: AxiosResponse = await axios.post(
      `${HOST_LINK}files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("File uploaded successfully", response.data);
  } catch (error) {
    console.error("Error uploading file", error);
  }
}
