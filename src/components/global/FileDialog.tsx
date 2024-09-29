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
  fileUploader: (file: File | null) => Promise<void>;
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
          <p className="text-teal-600">
            votre fichier a été téléchargé avec succès.
          </p>
        ),
        error: (
          <p className="text-red-500">Impossible de télécharger le fichier.</p>
        ),
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
          <DialogTitle>Charger un fichier</DialogTitle>
          <DialogDescription>
            choisissez un fichier excel qui ne dépasse pas la taille indiquée
            ci-dessous
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
