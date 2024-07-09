import { UserInfo } from "@/components/profile/UserInfo";
import { ls } from "@/lib/LocalStorage";
import { UserInfoType } from "@/types/UserInfo";
import { useEffect } from "react";

export function Profile() {
  useEffect(() => {
    const userInfo: UserInfoType = ls.userInfo();
    const roles = ls.roles();
    console.log(userInfo, roles);
  }, []);
  return (
    <div className="w-full h-full flex flex-wrap items-stretch justify-center gap-2">
      <UserInfo className="bg-white rounded p-4 px-2 w-full lg:w-2/3 flex-shrink-0 h-auto" />
    </div>
  );
}
