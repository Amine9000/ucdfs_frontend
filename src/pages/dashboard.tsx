import Content from "@/components/dashboard/content";
import Navbar from "@/components/dashboard/navbar";
import SideBar from "@/components/dashboard/sidebar";
import { Profile } from "@/features/profile/Profile";
import { ValidationList } from "@/features/validationList/ValidationList";
import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import { Bolt, ClipboardList, Settings, User } from "lucide-react";
import { useState } from "react";

const initialSidebarList: SidebarItemType[] = [
  {
    label: "students",
    icon: ClipboardList,
    element: <ValidationList />,
  },
  {
    label: "profs needs",
    icon: Bolt,
    element: <div>profs needs</div>,
  },
];

const profileList: SidebarItemType[] = [
  {
    label: "parameters",
    icon: Settings,
    element: <div>parameters</div>,
  },
  {
    label: "profile",
    icon: User,
    element: <Profile />,
  },
];

const initialSidebarSections: SidebarSectionType[] = [
  {
    id: "1",
    title: "Menu",
    items: initialSidebarList,
    position: Position.TOP,
  },
  {
    id: "2",
    title: "help",
    items: profileList,
    position: Position.BOTTOM,
  },
];

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
