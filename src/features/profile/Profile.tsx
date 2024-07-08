import { NotifySection } from "@/components/global/NotifySection";
import { StudentValidation } from "@/components/profile/StudentValidation";
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
    <div className="w-full h-full flex flex-wrap items-stretch justify-start gap-2">
      <UserInfo className="bg-white rounded p-4 w-full lg:w-1/2 xl:w-1/3 flex-shrink px-2 h-auto" />
      <StudentValidation className="bg-white p-4 rounded w-full lg:flex-1 flex-shrink xl:w-1/3 px-2 h-auto" />
      <NotifySection className="bg-white rounded p-4 w-full lg:w-full xl:w-1/3 px-2 h-auto" />
    </div>
  );
}
