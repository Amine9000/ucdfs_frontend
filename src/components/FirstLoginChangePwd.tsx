import { setStateType } from "@/types/setState";
import { ChangePassword } from "./ChangePassword";

export function FirstLoginChangePwd({
  setFirstTimeLogin,
}: {
  setFirstTimeLogin: setStateType<boolean>;
}) {
  return (
    <div className="bg-gray-50/75 flex items-center justify-center text-slate-700 absolute top-0 left-0 w-full h-full">
      <ChangePassword setFirstTimeLogin={setFirstTimeLogin} />
    </div>
  );
}
