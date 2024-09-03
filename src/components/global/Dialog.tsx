import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AlertMessageType } from "@/types/AlertMessage";
import { HTMLAttributes, useState } from "react";
import { Button } from "../ui/button";
import { setStateType } from "@/types/setState";

interface UCDAlertDialogOptions extends HTMLAttributes<HTMLDivElement> {
  message: AlertMessageType;
  confirmAction: (setOpen: setStateType<boolean>) => void;
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
    <Dialog {...props} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
          <DialogDescription>{message.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => confirmAction(setOpen)}
            className={cn(colors[message.type], "text-white")}
            type="submit"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
