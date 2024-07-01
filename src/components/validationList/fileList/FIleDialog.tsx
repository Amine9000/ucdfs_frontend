import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setStateType } from "@/types/setState";
import { FileDropArea } from "./FileDropArea";
import { useScreen } from "@/hooks/useScreen";
import { useState } from "react";
import { uploadFile } from "@/lib/axios/fileUpload";

type FileDialogProps = {
  open: boolean;
  setOpen: setStateType<boolean>;
  setFileUploadedDialog: setStateType<boolean>;
};

export function FileDialog({
  open,
  setOpen,
  setFileUploadedDialog,
}: FileDialogProps) {
  const { screenSelectedHandler } = useScreen();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FileDropArea
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              if (screenSelectedHandler) {
                uploadFile(uploadedFiles[0]);
                setUploadedFiles([]);
                // screenSelectedHandler("fileData");
              }
              setFileUploadedDialog(true);
              setOpen(false);
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
