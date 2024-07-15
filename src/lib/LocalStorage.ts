import { Roles } from "@/enums/Roles";
import { UserInfoType } from "@/types/UserInfo";

class LocalStorage {
  roles = () => {
    return JSON.parse(localStorage.getItem("roles") ?? "[]");
  };
  userInfo = () => {
    return JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  };
  setRoles = (roles: Roles[]) => {
    localStorage.setItem("roles", JSON.stringify(roles));
  };
  setUserInfo = (userInfo: UserInfoType) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };
  clear = () => {
    localStorage.clear();
  };
  setAccessToken = (accessTk: string) => {
    localStorage.setItem("access_token", accessTk);
  };
  getAccessToken = () => {
    return localStorage.getItem("access_token") ?? "";
  };
  checkUserData = () => {
    const access_token = this.getAccessToken();
    const roles = this.roles();
    return roles.length > 0 && access_token.length > 0;
  };
}

export const ls = new LocalStorage();
