import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { calculatePasswordScore, PasswordScoreType } from "@/lib/passwordScore";
import { Checkbox } from "./ui/checkbox";
import { changePwdReq } from "@/lib/axios/students/changePassword";
import toast from "react-hot-toast";
import { ToastError } from "@/lib/ToastError";
import { setStateType } from "@/types/setState";
import { ls } from "@/lib/LocalStorage";
import { changePwdReqUser } from "@/lib/axios/users/changePwdReqUser";

export function ChangePassword({
  setFirstTimeLogin,
}: {
  setFirstTimeLogin: setStateType<boolean>;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [scoreColor, setScoreColor] = useState<string>("bg-red-500");
  const [scoreData, setScoreData] = useState<PasswordScoreType>({
    score: 0,
    passwordProps: {
      length: false,
      upperCase: false,
      lowerCase: false,
      number: false,
      specialChar: false,
    },
  });

  function validatePassword() {
    const scoreData = calculatePasswordScore(password);
    setScoreData(scoreData);
    if (scoreData.score < 10) return false;
    return true;
  }

  useEffect(() => {
    validatePassword();
  }, [password]);

  async function handleChangePwdClick() {
    if (validatePassword()) {
      const roles: string = ls.roles();
      let data;
      if (roles.includes("student")) data = await changePwdReq(password);
      else data = await changePwdReqUser(password);
      if (data.success) {
        toast.success("Password changed successfully");
        setFirstTimeLogin(false);
      } else {
        ToastError("Failed to change password");
      }
    } else {
      return;
    }
  }

  function getScoreColor(score: number) {
    if (score < 5) return setScoreColor("bg-red-500");
    if (score >= 5 && score < 10) return setScoreColor("bg-orange-500");
    if (score == 10) return setScoreColor("bg-green-500");
  }

  useEffect(() => {
    getScoreColor(scoreData.score);
  }, [scoreData.score]);

  return (
    <div className="bg-gray-50/75 flex items-center justify-center text-slate-700 absolute top-0 left-0 w-full h-full">
      <div className="max-w-[500px] bg-white rounded p-4">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center">Change Password</h1>
          {/* small description */}
          <p className="text-center text-gray-500 text-sm">
            Enter your current password and new password to change your password
          </p>
        </header>
        <div className="mt-10">
          <div className="mb-4 flex flex-col gap-1 justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-8 w-full bg-white text-gray-600 flex gap-2 items-center justify-start px-2 rounded text-sm">
                  <Checkbox checked={scoreData.passwordProps.length} />
                  <span>at least 8 characters long</span>
                </div>
                <div className="h-8 w-full bg-white text-gray-600 flex gap-2 items-center justify-start px-2 rounded text-sm">
                  <Checkbox checked={scoreData.passwordProps.upperCase} />
                  <span>at least one uppercase letter</span>
                </div>
                <div className="h-8 w-full bg-white text-gray-600 flex gap-2 items-center justify-start px-2 rounded text-sm">
                  <Checkbox checked={scoreData.passwordProps.lowerCase} />
                  <span>at least one lowercase letter</span>
                </div>
                <div className="h-8 w-full bg-white text-gray-600 flex gap-2 items-center justify-start px-2 rounded text-sm">
                  <Checkbox checked={scoreData.passwordProps.number} />
                  <span>at least one number</span>
                </div>
                <div className="h-8 w-full bg-white text-gray-600 flex gap-2 items-center justify-start px-2 rounded text-sm">
                  <Checkbox checked={scoreData.passwordProps.specialChar} />
                  <span>at least one special character</span>
                </div>
              </div>
            </div>
            <div
              id="score"
              className="flex flex-col gap-2 items-start justify-center"
            >
              <span className="text-gray-900 font-medium text-sm">score</span>
              <div className="bg-white h-2 w-full grid grid-cols-10 gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`col-span-1 h-2 transition-colors duration-500
                            ${i < scoreData.score ? scoreColor : "bg-gray-200"}
                            `}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="password"
              className={"block mb-2 text-sm font-medium text-gray-700"}
            >
              <span className="text-gray-700 text-sm">Current Password</span>
            </Label>
            <div className="flex items-center justify-center gap-2">
              <Input
                type={show ? "text" : "password"}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 mt-1 text-sm text-gray-700 bg-white rounded border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your current password"
              />
              <div
                onClick={() => setShow(!show)}
                className={
                  "flex items-center justify-center gap-2 bg-gray-50 rounded h-10 w-10 text-gray-500 cursor-pointer"
                }
              >
                {!show && <Eye size={20} />}
                {show && <EyeOff size={20} />}
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-end">
            <Button onClick={handleChangePwdClick}>
              <span className="text-white text-sm">change Password</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
