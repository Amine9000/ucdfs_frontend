import Content from "@/components/dashboard/content";
import Navbar from "@/components/dashboard/navbar";
import SideBar from "@/components/dashboard/sidebar";
import { useTabs } from "@/hooks/useTabs";
import { ls } from "@/lib/LocalStorage";
import { useEffect } from "react";

export default function Dashboard() {
  const { itemSelected } = useTabs();

  useEffect(() => {
    if (ls.checkUserData()) {
      document.title = itemSelected?.label ?? "Dashboard";
    } else location.href = "/login";
  }, [itemSelected]);
  return (
    <div className="h-screen w-screen flex items-center justify-start p-2 gap-2 bg-slate-100">
      <SideBar />
      <div className="w-full h-full flex flex-col items-start justify-start gap-2">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}
