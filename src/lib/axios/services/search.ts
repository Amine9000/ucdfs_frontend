import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { Demande } from "@/types/Demande";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export async function searchServices(search_query: string): Promise<Demande[]> {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const res = await axios.get(
      `${HOST_LINK}services/search?q=${search_query}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (res.data) return res.data;
    else return [];
  } catch (err) {
    const error = err as AxiosError;
    toast.error("axios error " + error.message);
    return [];
  }
  return [];
}
