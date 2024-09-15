import { useTabs } from "@/hooks/useTabs";
import { ls } from "@/lib/LocalStorage";
import { UserInfoType } from "@/types/UserInfo";
import { useEffect, useState } from "react";
import { FirstLoginChangePwd } from "../FirstLoginChangePwd";

export default function Content() {
  const { itemSelected } = useTabs();
  const infos: UserInfoType = ls.userInfo();
  const [firstTimeLogin, setFirstTimeLogin] = useState<boolean>(
    infos.is_first_login
  );
  useEffect(() => {
    const userinfo: UserInfoType = ls.userInfo();
    ls.setUserInfo({
      ...userinfo,
      is_first_login: firstTimeLogin,
    });
  }, [firstTimeLogin]);
  return (
    <div className="w-full flex-grow rounded flex items-center justify-center overflow-y-auto">
      {!firstTimeLogin && itemSelected && itemSelected.element}
      {!firstTimeLogin && !itemSelected && (
        <div className="text-sm text-slate-500 text-center">No Content</div>
      )}
      {firstTimeLogin && (
        <FirstLoginChangePwd setFirstTimeLogin={setFirstTimeLogin} />
      )}
    </div>
  );
}
