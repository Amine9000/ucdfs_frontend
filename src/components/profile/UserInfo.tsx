import { Settings2 } from "lucide-react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface UserInfoProps {
  className: string;
}

export function UserInfo({ className }: UserInfoProps) {
  return (
    <div className={className}>
      {/* cover and profile picture */}
      <div className="relative w-full h-[200px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md">
        <div className="bg-slate-100 absolute h-[80px] w-[80px] rounded-md left-[5px] top-[115px] overflow-hidden">
          {<Icons.avatar className="w-full h-full text-slate-500" />}
        </div>
      </div>
      {/* user info */}
      <div className="mt-4">
        <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">First Name</div>
          <div className="text-gray-700 w-1/2">John</div>
        </div>
        <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">Last Name</div>
          <div className="text-gray-700 w-1/2">Doe</div>
        </div>
        <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">Age</div>
          <div className="text-gray-700 w-1/2 flex gap-4">25</div>
        </div>
        <div className="flex w-full h-auto px-4 py-2 gap-4 justify-start items-center">
          <div className="text-sm text-slate-500 w-1/2">Birth date</div>
          <div className="text-gray-700 w-1/2 flex gap-4">thu 10 feb 1999</div>
        </div>
      </div>
      <Button className="bg-gray-200 hover:bg-gray-200 text-gray-900 rounded-md w-full h-9 flex gap-4 items-center justify-center mt-4">
        <Settings2 size={20} /> update
      </Button>
    </div>
  );
}
