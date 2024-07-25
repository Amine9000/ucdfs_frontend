import { Button } from "@/components/ui/button";
import { FileUp, Group, Plus } from "lucide-react";
import { SearchForm } from "../../global/Search";
import { FileDialog } from "../../global/FileDialog";
import { useEffect, useState } from "react";
import { getEtapes, searchEtapes } from "@/lib/axios/studentsData";
import { useStudentsData } from "@/hooks/useStudentsData";
import { Pagination } from "../../global/Pagination";
import { pageLength } from "@/constants/pagination";
import { GroupDialog } from "./GroupDialog";
import { AddBranchDialog } from "./AddBranchDialog";
import { AddModuleDialog } from "./addModule";
import { useEtapesData } from "@/hooks/useEtapesData";
import { uploadFile } from "@/lib/axios/fileUpload";

export function EtapeListNavbar() {
  const { setData } = useStudentsData();
  const { etapes, setEtapes } = useEtapesData();
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileUploadedDialogOpen, setFileUploadedDialog] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [morePage, setMorePages] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!fileUploadedDialogOpen) {
      dialogOpenChangeHandler(pageNum, pageLength);
    }
  }, [fileUploadedDialogOpen]);

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
        <GroupDialog>
          <Button className="text-white bg-sky-500 hover:bg-sky-700">
            Groupe <Group size={20} className="text-white ml-2" />
          </Button>
        </GroupDialog>
        <AddBranchDialog setData={setEtapes} data={etapes}>
          <Button className="text-white bg-sky-500 hover:bg-sky-700">
            Filière <Plus size={20} className="text-white ml-2" />
          </Button>
        </AddBranchDialog>
        <AddModuleDialog setData={setEtapes} data={etapes}>
          <Button className="text-white bg-sky-500 hover:bg-sky-700">
            Module <Plus size={20} className="text-white ml-2" />
          </Button>
        </AddModuleDialog>
        <Button
          onClick={() => setFileDialogOpen(true)}
          className="text-white bg-sky-500 hover:bg-sky-700"
        >
          Charger <FileUp size={20} className="text-white ml-2" />
        </Button>
        <FileDialog
          fileUploader={uploadFile}
          open={fileDialogOpen}
          setFileUploadedDialog={setFileUploadedDialog}
          setOpen={setFileDialogOpen}
        />
      </div>
    </div>
  );
}
