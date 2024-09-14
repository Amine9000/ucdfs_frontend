import axios, { AxiosResponse } from "axios";
import { ls } from "../../LocalStorage";
import { HOST_LINK } from "@/constants/host";
import toast from "react-hot-toast";
import { ToastError } from "@/lib/ToastError";

export async function studentsFileupload(
  file: string | Blob | null,
  modules_codes: { module_code: string; etape_code: string }[]
) {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("modules", JSON.stringify(modules_codes));
    const access_token = ls.getAccessToken();
    try {
      const response: AxiosResponse = await axios.post(
        `${HOST_LINK}files/students`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202
      ) {
        toast.success("File uploaded successfully");
        return response.data;
      } else {
        toast.error("Error uploading file");
        return null;
      }
    } catch (error) {
      ToastError("Error uploading file");
    }
  }
}
