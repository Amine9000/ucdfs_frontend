import { signInDataType } from "@/types/signInDataType";
import axios from "axios";

export async function SignUp(data: signInDataType) {
  try {
    const res = await axios.post("http://localhost:3000/auth/signin", {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
