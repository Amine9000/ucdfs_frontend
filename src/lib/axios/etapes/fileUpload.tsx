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
          responseType: "blob",
        }
      );
      toast.promise(downloadstudentsPasswordsFile(response), {
        loading: "Downloading passwords file ...",
        success: (
          <p className="text-teal-600">
            votre fichier a été téléchargé avec succès.
          </p>
        ),
        error: (
          <p className="text-red-500">Could not download the passwords file.</p>
        ),
      });
    } catch (error) {
      const err = error as AxiosError;
      ToastError((err.response?.data as { message: string }).message);
    }
  }
}

async function downloadstudentsPasswordsFile(response: AxiosResponse) {
  if (response.data) {
    const url = window.URL.createObjectURL(
      new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
