import axios, { AxiosError, AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { HOST_LINK } from "@/constants/host";
import toast from "react-hot-toast";
import { ToastError } from "@/lib/ToastError";

export async function uploadFile(file: string | Blob | null) {
  if (file) {
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
      if (
        response.status == 200 ||
        response.status == 201 ||
        response.status == 202
      ) {
        toast.success("File uploaded successfully");
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      const err = error as AxiosError;
      ToastError((err.response?.data as { message: string }).message);
    }
  }
}
