import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FileSearch } from "./FileSearch";
import { FileDialog } from "./FIleDialog";
import { useState } from "react";
import { MessageDialog } from "./MessageDialog";
import { MessageType } from "@/types/Message";
import { getFiles } from "@/lib/axios/fileData";
import { useFileData } from "@/hooks/useFileData";

const fileUploadedMessage: MessageType = {
  title: "File Upload",
  description: "your file was uploaded successfully.",
  type: "success",
};

export function FileListNavbar() {
  const { setData } = useFileData();
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileUploadedDialogOpen, setFileUploadedDialog] = useState(false);

  async function dialogOpenChangeHandler() {
    const newData = await getFiles();
    setFileUploadedDialog(false);
    setData(newData);
  }
  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-4">
      <FileSearch />
      <div className="h-full w-auto flex items-center gap-2">
        <Button
          onClick={() => setFileDialogOpen(true)}
          className="text-white bg-sky-500 hover:bg-sky-700"
        >
          New <Plus className="text-white size-6 ml-2" />
        </Button>
        <FileDialog
          open={fileDialogOpen}
          setFileUploadedDialog={setFileUploadedDialog}
          setOpen={setFileDialogOpen}
        />
        <MessageDialog
          message={fileUploadedMessage}
          open={fileUploadedDialogOpen}
          onOpenChange={dialogOpenChangeHandler}
        />
      </div>
    </div>
  );
}
