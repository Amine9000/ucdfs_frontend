import { GraduationCap, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function Logins() {
  return (
    <div className="w-full flex gap-4 items-center justify-center">
      <Link to={"admins"} className="w-1/2 flex gap-4 items-center">
        <Button variant={"link"} className="w-full bg-slate-100">
          <UserCog className="mr-2 h-4 w-4" /> Login as Admin
        </Button>
      </Link>
      <Link to={"students"} className="w-1/2 flex gap-4 items-center">
        <Button variant={"link"} className="w-full bg-slate-100">
          <GraduationCap className="mr-2 h-5 w-5" /> Login as Student
        </Button>
      </Link>
    </div>
  );
}
