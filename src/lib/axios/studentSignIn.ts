import { HOST_LINK } from "@/constants/host";
import { StudentSignInDataType } from "@/types/studentSignInDataType";
import axios, { AxiosError } from "axios";

export async function studentSignIn(data: StudentSignInDataType) {
  try {
    const res = await axios.post(`${HOST_LINK}auth/student/signin`, {
      cne: data.cne,
      password: data.password,
    });
    return res.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) console.error(err.message);
    else console.error(err);
  }
}
