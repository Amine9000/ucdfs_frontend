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
import axios, { AxiosResponse } from "axios";

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

async function uploadFile(file: string | Blob) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3000/files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("File uploaded successfully", response.data);
  } catch (error) {
    console.error("Error uploading file", error);
  }
}
