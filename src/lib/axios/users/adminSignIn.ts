import { HOST_LINK } from "@/constants/host";
import { AdminsignInDataType } from "@/types/adminSignInDataType";
import axios from "axios";

export async function adminSignIn(data: AdminsignInDataType) {
  try {
    const res = await axios.post(`${HOST_LINK}auth/admin/signin`, {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
