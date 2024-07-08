import Content from "@/components/dashboard/content";
import Navbar from "@/components/dashboard/navbar";
import SideBar from "@/components/dashboard/sidebar";

export default function Dashboard() {
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
