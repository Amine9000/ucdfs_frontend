import axios, { AxiosResponse } from "axios";

export async function uploadFile(file: string | Blob) {
  const formData = new FormData();
  formData.append("file", file);
  const access_token = localStorage.getItem("access_token") ?? "";
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3000/files",
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
