import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { AlertMessageType } from "@/types/AlertMessage";
import { HTMLAttributes, useState } from "react";

interface UCDAlertDialogOptions extends HTMLAttributes<HTMLDivElement> {
  message: AlertMessageType;
  confirmAction: () => void;
}

const colors = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-orange-500",
  info: "bg-sky-500",
};

export function UCDAlertDialog({
  children,
  message,
  confirmAction,
  ...props
}: UCDAlertDialogOptions) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AlertDialog {...props} open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message.title}</AlertDialogTitle>
          <AlertDialogDescription>{message.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => confirmAction()}
            className={cn(colors[message.type], "text-white")}
          >
            confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
