import { ls } from "@/lib/LocalStorage";
import { SignUp } from "@/lib/axios/signUp";
import { useState } from "react";
import { UCDAlert } from "./UCDAlert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

interface StudentsLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StudentsLoginForm({
  className,
  ...props
}: StudentsLoginFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const data = await SignUp({
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
              id="cne"
              onChange={(e) => e && setEmail(e.target.value)}
              placeholder="A123456789"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              onChange={(e) => e && setPassword(e.target.value)}
              placeholder="***********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
