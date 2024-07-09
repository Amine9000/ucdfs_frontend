import { BellRing, ChevronRight, Info, MailWarning } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTabs } from "@/hooks/useTabs";
import { Screen } from "@/enums/Screens";

interface NotifySectionProps {
  className: string;
}

export function NotifySection({ className }: NotifySectionProps) {
  const { navigateTo } = useTabs();
  return (
    <div className={cn(className, "flex flex-col gap-2 items-center")}>
      <div className="w-full h-auto mb-4">
        <span className="text-gray-600 h-12 flex items-center font-bold px-4">
          Notifications
        </span>
        <div className="border-b"></div>
      </div>
      {/* notifications */}
      <div className="w-full flex flex-col gap-2">
        {/* notification start */}
        <div className="flex items-start gap-2 bg-slate-50 p-2 rounded">
          <div className="w-10 h-10 rounded p-2 flex items-center justify-center flex-shrink-0 bg-teal-100">
            <Info size={20} className="text-teal-500" />
          </div>
          <div className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eaque consequuntur...
          </div>
        </div>
        {/* end */}
        {/* notification start */}
        <div className="flex items-start gap-2 bg-slate-50 p-2 rounded">
          <div className="w-10 h-10 rounded p-2 flex items-center justify-center flex-shrink-0 bg-red-100">
            <MailWarning size={20} className="text-red-500" />
          </div>
          <div className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eaque consequuntur...
          </div>
        </div>
        {/* end */}
        {/* notification start */}
        <div className="flex items-start gap-2 bg-slate-50 p-2 rounded">
          <div className="w-10 h-10 rounded p-2 flex items-center justify-center flex-shrink-0 bg-orange-100">
            <BellRing size={20} className="text-orange-500" />
          </div>
          <div className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eaque consequuntur...
          </div>
        </div>
        {/* end */}
      </div>
      <Button
        onClick={() => {
          navigateTo(Screen.Notifications);
        }}
        className="bg-gray-200 hover:bg-gray-200 text-gray-900 rounded-md w-36 h-9 flex gap-4 items-center justify-center mt-4"
      >
        more <ChevronRight size={20} />
      </Button>
    </div>
  );
}
