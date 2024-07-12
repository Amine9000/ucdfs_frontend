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
import { ReactElement } from "react";

type UCDAlertDialogOptions = {
  trigger?: string | ReactElement;
  message: AlertMessageType;
  confirmAction: () => void;
  open: boolean;
  setOpenState: setStateType<boolean>;
};

const colors = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-orange-500",
  info: "bg-sky-500",
};

export function UCDAlertDialog({
  trigger,
  message,
  confirmAction,
  open,
  setOpenState,
}: UCDAlertDialogOptions) {
  return (
    <AlertDialog open={open} onOpenChange={setOpenState}>
      {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
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
