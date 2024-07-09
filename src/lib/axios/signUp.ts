import { HOST_LINK } from "@/constants/host";
import { signInDataType } from "@/types/signInDataType";
import axios from "axios";

export async function SignUp(data: signInDataType) {
  try {
    const res = await axios.post(`${HOST_LINK}auth/signin`, {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
