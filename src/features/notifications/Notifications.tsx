import { NotifySection } from "@/components/global/NotifySection";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface NotificationsProps extends HTMLAttributes<HTMLDivElement> {}

export function Notifications({ className }: NotificationsProps) {
  return (
    <div
      className={cn(className, "w-full h-full flex items-start justify-center")}
    >
      <NotifySection className="bg-white rounded p-2 w-full lg:w-2/3 h-auto" />
    </div>
  );
}
