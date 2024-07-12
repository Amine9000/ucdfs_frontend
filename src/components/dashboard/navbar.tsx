import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { UserProfileOptions } from "../profile/userProfileOptions";
import { useEffect, useState } from "react";
import { UserInfoType } from "@/types/UserInfo";
import { ls } from "@/lib/LocalStorage";
import { HOST_LINK } from "@/constants/host";
import { useTabs } from "@/hooks/useTabs";

export default function Navbar() {
  const { itemSelected } = useTabs();
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    const infos: UserInfoType = ls.userInfo();
    const user_roles: string[] = ls.roles();
    if (user_roles.length > 0) setRoles(user_roles);
    if (
      infos.user_avatar_path &&
      infos.user_email &&
      infos.user_fname &&
      infos.user_lname
    )
      setUserInfo(infos);
  }, []);
  return (
    <div className="w-full h-[52px] bg-white rounded flex-shrink-0 flex items-center justify-between px-4 py-1">
      {/* right */}
      <div className="">
        <div className="font-bold text-lg first-letter:uppercase text-zinc-700">
          {itemSelected?.label ?? "Dashboard"}
        </div>
      </div>

      {/* left */}
      <div className="flex items-center justify-between gap-4 h-full">
        <Button className="group relative text-zinc-800 bg-slate-100 hover:bg-slate-100">
          <span className="group-hover:animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-red-500 opacity-75 top-2 right-4"></span>
          <Bell size={20} />
        </Button>
        {userInfo?.user_email && (
          <div className="flex h-full w-auto items-center justify-between gap-4 px-4 rounded py-1">
            <div className="flex flex-col justify-center items-start">
              <div className="text-zinc-700 uppercase text-sm font-bold w-[150px] truncate">
                {userInfo.user_lname + " " + userInfo.user_fname}
              </div>
              <div className="text-zinc-400 text-xs first-letter:uppercase">
                {roles.join(", ")}
              </div>
            </div>
            <UserProfileOptions>
              <div className="flex-shrink-0 flex -space-x-2 overflow-hidden cursor-pointer shadow-sm">
                <img
                  className="inline-block h-10 w-h-10 rounded-md ring-2 ring-white"
                  src={HOST_LINK + userInfo.user_avatar_path}
                  alt=""
                />
              </div>
            </UserProfileOptions>
          </div>
        )}
      </div>
    </div>
  );
}
