import { useEffect } from "react";

export function Profile() {
  useEffect(() => {
    const userFname = localStorage.getItem("user_fname") ?? "";
    const userLname = localStorage.getItem("user_lname") ?? "";
    const userEmail = localStorage.getItem("user_email") ?? "";
    const roles = localStorage.getItem("roles") ?? [];
    console.log(userFname, userLname, userEmail, roles);
  }, []);
  return <div>profile</div>;
}
