import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageType } from "@/types/Message";
import { setStateType } from "@/types/setState";

type MessageDialogProps = {
  message: MessageType;
  open: boolean;
  onOpenChange: setStateType<boolean>;
};

export function MessageDialog({
  message,
  open,
  onOpenChange,
}: MessageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
          <DialogDescription>{message.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
