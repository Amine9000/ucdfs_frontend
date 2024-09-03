import { HOST_LINK } from "@/constants/host";
import { ls } from "@/lib/LocalStorage";
import { handleUnauthorized } from "@/lib/utils";
import { UserDto } from "@/types/user/UserDto";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export async function searchUsers(search_query: string): Promise<UserDto[]> {
  const access_token = ls.getAccessToken();
  if (access_token.length == 0) handleUnauthorized();
  try {
    const res = await axios.get(`${HOST_LINK}users/search?q=${search_query}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.data) return res.data;
  } catch (err) {
    const error = err as AxiosError;
    toast.error("axios error " + error.message);
  }
  return [];
}
