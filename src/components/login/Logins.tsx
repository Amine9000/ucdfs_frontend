import { GraduationCap, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function Logins() {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <Link to={"admins"} className="w-full flex gap-4 items-center">
        <Button className="w-full">
          <Mail className="mr-2 h-4 w-4" /> Login as Admin
        </Button>
      </Link>
      <Link to={"students"} className="w-full flex gap-4 items-center">
        <Button className="w-full">
          <GraduationCap className="mr-2 h-5 w-5" /> Login as Student
        </Button>
      </Link>
    </div>
  );
}
