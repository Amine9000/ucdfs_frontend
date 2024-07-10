import { Quote } from "lucide-react";
import { HTMLAttributes } from "react";
import { Outlet } from "react-router-dom";

interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export default function Login({ children }: LoginProps) {
  return (
    <div className="h-screen w-screen p-4">
      <div className="container relative h-full flex items-center justify-center px-2 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col rounded p-10 text-white lg:flex dark:border-r">
          <div className="absolute flex items-center justify-center inset-0 rounded">
            <div className="absolute w-full h-full rounded overflow-hidden">
              <img src="/svgs/login/img.jpg" className="h-full" alt="" />
            </div>
            <div className="relative self-center flex flex-col gap-10 items-center justify-center">
              <div className="text-white border-b-2 p-4 py-8 w-4/5 flex gap-4 items-start justify-center">
                <Quote
                  size={30}
                  className="fill-white text-white rotate-y-180 "
                />
                <p className="text-lg w-3/4 self-center shadow-sm text-shadow-md">
                  At Université Chouaib Doukkali Faculté des Sciences El Jadida,
                  we strive to cultivate a spirit of innovation and excellence.
                  Our commitment to cutting-edge research, quality education,
                  and community engagement empowers our students to become
                  leaders in science and technology, driving progress and
                  fostering a brighter future for all.
                </p>
                <Quote size={30} className="fill-white text-white self-end" />
              </div>
              <div className="text-center xl:text-start px-4">
                <h1 className="text-5xl font-bold text-gray-100">
                  University chouaib doukkali
                </h1>
                <h3 className="text-3xl font-medium text-gray-200">
                  faculte des science el jadida
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="p-2 rounded w-full h-auto py-4 px-2 bg-slate-100 flex items-center justify-center">
                <img
                  src="logo_ucd_fs_long.svg"
                  className="h-8"
                  alt="UCD FS logo"
                />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to login to your account
              </p>
            </div>
            {children}
            <Outlet />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
