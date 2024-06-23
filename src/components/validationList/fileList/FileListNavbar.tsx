import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchForm } from "../global/Search";
import { FileDialog } from "./FIleDialog";
import { useEffect, useState } from "react";
import { MessageDialog } from "./MessageDialog";
import { MessageType } from "@/types/Message";
import { getEtapes, searchEtapes } from "@/lib/axios/studentsData";
import { useFileData } from "@/hooks/useFileData";
import { Pagination } from "../global/Pagination";
import { pageLength } from "@/constants/pagination";
import { FileDataItem } from "@/types/FileDataItem";
import { setStateType } from "@/types/setState";

const fileUploadedMessage: MessageType = {
  title: "File Upload",
  description: "your file was uploaded successfully.",
  type: "success",
};

type FileListNavbarProps = {
  etapes: FileDataItem[];
  setEtapes: setStateType<FileDataItem[]>;
};

export function FileListNavbar({ etapes, setEtapes }: FileListNavbarProps) {
  const { setData } = useFileData();
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileUploadedDialogOpen, setFileUploadedDialog] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [morePage, setMorePages] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function dialogOpenChangeHandler(pageNum: number, pageLength: number) {
    const newData = await getEtapes(pageNum, pageLength);

    setFileUploadedDialog(false);
    setData(newData);
  }

  useEffect(() => {
    async function fetchFile() {
      const newData = await getEtapes(pageNum, pageLength);
      setEtapes(newData);
    }
    fetchFile();
  }, [pageNum]);

  useEffect(() => {
    if (etapes.length < pageLength) setMorePages(false);
    else setMorePages(true);
  }, [etapes]);

  useEffect(() => {
    async function fetchData() {
      if (searchQuery.length > 0)
        searchEtapes(setEtapes, searchQuery, pageLength, pageNum);
      if (searchQuery.length == 0) {
        const newData = await getEtapes(pageNum, pageLength);

        setEtapes(newData);
      }
    }
    fetchData();
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-4">
      <SearchForm
        className="w-[400px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="h-full w-auto flex items-center gap-2">
        <Pagination pageNum={pageNum} setPageNum={setPageNum} more={morePage} />
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
          onOpenChange={() => dialogOpenChangeHandler(pageNum, pageLength)}
        />
      </div>
    </div>
  );
}
