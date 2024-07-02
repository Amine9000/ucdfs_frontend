import { Button } from "@/components/ui/button";
import { initialSidebarList } from "@/constants/sidebar";
import { Screen } from "@/enums/Screens";
import { useTabs } from "@/hooks/useTabs";
import { useEffect } from "react";

export function Profile() {
  const { navigateTo } = useTabs();
  initialSidebarList;
  useEffect(() => {
    const userFname = localStorage.getItem("user_fname") ?? "";
    const userLname = localStorage.getItem("user_lname") ?? "";
    const userEmail = localStorage.getItem("user_email") ?? "";
    const roles = localStorage.getItem("roles") ?? [];
    console.log(userFname, userLname, userEmail, roles);
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          navigateTo(Screen.Profs);
        }}
      >
        Go
      </Button>
    </div>
  );
}
