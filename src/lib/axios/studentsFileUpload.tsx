import axios, { AxiosResponse } from "axios";
import { ls } from "../LocalStorage";
import { HOST_LINK } from "@/constants/host";
import toast from "react-hot-toast";

export async function studentsFileupload(file: string | Blob | null) {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
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
          responseType: "blob",
        }
      );
      toast.promise(downloadstudentsPasswordsFile(response), {
        loading: "Downloading passwords file ...",
        success: (
          <p className="text-teal-600">
            your file was downloaded successfully.
          </p>
        ),
        error: (
          <p className="text-red-500">Could not download the passwords file.</p>
        ),
      });
    } catch (error) {
      console.error("Error uploading file", error);
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
