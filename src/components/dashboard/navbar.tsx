import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="w-full h-[52px] bg-white rounded flex-shrink-0 flex items-center justify-between px-4 py-1">
      {/* right */}
      <div className="">
        <div className="font-bold text-lg first-letter:uppercase text-zinc-700">
          Dashboard
        </div>
      </div>

      {/* left */}
      <div className="flex items-center justify-between gap-4 h-full">
        <Button className="group relative text-zinc-800 bg-slate-100 hover:bg-slate-100">
          <span className="group-hover:animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-red-500 opacity-75 top-2 right-4"></span>
          <Bell size={20} />
        </Button>
        <div className="flex h-full w-auto items-center justify-between gap-4 px-4 rounded py-1">
          <div className="flex flex-col justify-center items-start">
            <div className="text-zinc-700 uppercase text-sm font-bold w-[150px] truncate">
              User name
            </div>
            <div className="text-zinc-400 text-sm first-letter:uppercase">
              Admin
            </div>
          </div>
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-10 w-h-10 rounded-md ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
