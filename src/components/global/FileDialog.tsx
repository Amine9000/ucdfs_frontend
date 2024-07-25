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
import toast from "react-hot-toast";

type FileDialogProps = {
  open: boolean;
  setOpen: setStateType<boolean>;
  setFileUploadedDialog: setStateType<boolean>;
  fileUploader: (file: string | Blob | null) => Promise<void>;
};

export function FileDialog({
  open,
  setOpen,
  setFileUploadedDialog,
  fileUploader,
}: FileDialogProps) {
  const { screenSelectedHandler } = useScreen();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  function handleSubmit() {
    if (screenSelectedHandler) {
      toast.promise(fileUploader(uploadedFile), {
        loading: "Uploading ...",
        success: (
          <p className="text-teal-600">your file was uploaded successfully.</p>
        ),
        error: <p className="text-red-500">Could not upload file.</p>,
      });
      setUploadedFile(null);
    }
    setFileUploadedDialog(true);
    setOpen(false);
  }
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
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
