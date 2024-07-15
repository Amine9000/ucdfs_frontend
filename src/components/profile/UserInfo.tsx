import { Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { UserInfoType } from "@/types/UserInfo";
import { ls } from "@/lib/LocalStorage";
import { cn } from "@/lib/utils";
import { useTabs } from "@/hooks/useTabs";
import { Screen } from "@/enums/Screens";
import { Badge } from "../ui/badge";
import { HOST_LINK } from "@/constants/host";
import moment from "moment";

interface UserInfoProps {
  className: string;
}

const Labels: Record<string, string> = {
  user_code: "Code",
  user_fname: "First Name",
  user_lname: "Last Name",
  user_email: "Email",
  user_phone_number: "Phone number",
  user_cne: "CNE",
  user_cin: "CIN",
  user_birthdate: "Birth Date",
};

export function UserInfo({ className }: UserInfoProps) {
  const { navigateTo } = useTabs();
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    const access_token: string = ls.getAccessToken();
    const infos: UserInfoType = ls.userInfo();
    const user_roles: string[] = ls.roles();
    if (user_roles.length > 0) setRoles(user_roles);
    if (access_token) setUserInfo(infos);
  }, []);
  return (
    <div
      className={cn(
        className,
        "h-full flex flex-col items-center justify-start"
      )}
    >
      {/* cover and profile picture */}
      <div className="w-full h-[200px] bg-gray-100 flex items-center rounded-md">
        <div className="bg-slate-100 h-[180px] w-full rounded-md flex items-start justify-center gap-4 px-4">
          <img
            className="h-full w-[180px] rounded-md text-slate-500"
            src={HOST_LINK + userInfo?.user_avatar_path}
            alt={userInfo?.user_fname}
          />
          <div className="bg-white flex-1 h-full flex-shrink-0 p-4 flex flex-col gap-4 justify-center rounded">
            <h1 className="text-4xl font-extrabold text-slate-700">
              {userInfo?.user_fname} {userInfo?.user_lname}
            </h1>
            {userInfo?.user_email && (
              <small className="text-gray-500">{userInfo?.user_email}</small>
            )}
            {userInfo?.user_cin && (
              <small className="text-gray-500">{userInfo?.user_cin}</small>
            )}
          </div>
        </div>
      </div>
      {/* user info */}
      <div className="mt-4 w-full">
        {userInfo &&
          Object.entries(userInfo as UserInfoType).map((item, i) => {
            return (
              Object.keys(Labels).includes(item[0]) && (
                <div
                  key={i}
                  className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center"
                >
                  <div className="text-sm text-slate-500 w-1/2">
                    {Labels[item[0]]}
                  </div>
                  <div className="text-gray-700 w-1/2">
                    {item[0] == "user_birthdate"
                      ? moment(item[1]).format("dddd, MMMM Do YYYY")
                      : item[1]}{" "}
                  </div>
                </div>
              )
            );
          })}
        <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">Roles</div>
          <div className="text-gray-700 w-1/2 flex gap-4">
            {roles.map((role, i) => {
              return (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-purple-700 bg-purple-200 hover:bg-purple-200 font-medium py-1 px-2"
                >
                  {role}
                </Badge>
              );
            })}
          </div>
        </div>
        {/* <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">Age</div>
          <div className="text-gray-700 w-1/2 flex gap-4">25</div>
        </div>
        <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">Birth date</div>
          <div className="text-gray-700 w-1/2 flex gap-4">thu 10 feb 1999</div>
        </div> */}
      </div>
      <Button
        onClick={() => navigateTo(Screen.Setting)}
        className="bg-gray-200 hover:bg-gray-200  text-gray-600 rounded-md w-full max-w-36 h-9 flex gap-4 items-center justify-center mt-4"
      >
        <Settings2 size={20} /> update
      </Button>
    </div>
  );
}
