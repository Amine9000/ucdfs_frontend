import Content from "@/components/dashboard/content";
import Navbar from "@/components/dashboard/navbar";
import SideBar from "@/components/dashboard/sidebar";
import {
  initialSidebarList,
  initialSidebarSections,
} from "@/constants/sidebar";
import { SidebarItemType } from "@/types/sidebarItem";
import { SidebarSectionType } from "@/types/sidebarSection";
import { useState } from "react";

export default function Dashboard() {
  const [itemSelected, setItemSelected] = useState<SidebarItemType>(
    initialSidebarList[0]
  );
  const [sidebarSections, setSidebarSections] = useState<SidebarSectionType[]>(
    initialSidebarSections
  );
  function handleSidebarItemSelected(item: SidebarItemType) {
    setItemSelected(item);
  }
  return (
    <div className="h-screen w-screen flex items-center justify-start p-2 gap-2 bg-slate-100">
      <SideBar
        sidebarSections={sidebarSections}
        handleItemSelected={handleSidebarItemSelected}
      />
      <div className="w-full h-full flex flex-col items-start justify-start gap-2">
        <Navbar />
        <Content content={itemSelected} />
      </div>
    </div>
  );
}
