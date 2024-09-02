import { cn } from "@/lib/utils";

interface NotifySectionProps {
  className: string;
}

export function NotifySection({ className }: NotifySectionProps) {
  return (
    <div className={cn(className, "flex flex-col gap-2 items-center")}>
      <div className="w-full h-auto mb-4">
        <span className="text-gray-600 h-12 flex items-center font-bold px-4">
          Notifications
        </span>
        <div className="border-b"></div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-center h-20 text-sm bg-slate-50 text-gray-500 rounded">
          No notifications
        </div>
      </div>
    </div>
  );
}
