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
import { setStateType } from "@/types/setState";
import { HTMLAttributes, useState } from "react";

interface UCDAlertDialogOptions extends HTMLAttributes<HTMLDivElement> {
  message: AlertMessageType;
  confirmAction?: () => void;
  open?: boolean;
  setOpenState?: setStateType<boolean>;
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
  open,
  setOpenState,
  confirmAction,
}: UCDAlertDialogOptions) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (setOpenState) {
      setOpenState(isOpen);
    } else {
      setInternalOpen(isOpen);
    }
  };
  return (
    <AlertDialog open={open ?? internalOpen} onOpenChange={handleOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message.title}</AlertDialogTitle>
          <AlertDialogDescription>{message.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => confirmAction && confirmAction()}
            className={cn(colors[message.type], "text-white")}
          >
            confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
