import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ls } from "@/lib/LocalStorage";
import { UCDAlert } from "./UCDAlert";
import { adminSignIn } from "@/lib/axios/users/adminSignIn";
import { Eye, EyeOff } from "lucide-react";

interface loginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminLoginForm({ className, ...props }: loginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = await adminSignIn({
      email: email,
      password: password,
    });
    if (data) {
      if (!data.access_token) {
        setErrorMessage(data.message);
      } else {
        ls.setAccessToken(data.access_token);
        ls.setRoles(data.user.roles);
        ls.setUserInfo(data.user);
        window.location.href = "/";
      }
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {errorMessage.length > 0 && (
        <UCDAlert title="Error" message={errorMessage} />
      )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="email"
              onChange={(e) => e && setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <div className="h-10 flex gap-1 items-center justify-between">
              <Input
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                id="password"
                onChange={(e) => e && setPassword(e.target.value)}
                value={password}
                placeholder="***********"
                type={showPwd ? "text" : "password"}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
              <div
                onClick={() => setShowPwd(!showPwd)}
                className="bg-gray-50 rounded h-10 w-10 flex items-center justify-center cursor-pointer text-gray-500"
              >
                {!showPwd ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
