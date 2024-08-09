import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, FileUp, Plus } from "lucide-react";
import { StudentsDataOptions } from "./StudentsDataOptions";
import { EtapeCodeInput } from "./EtapeCodeInput";
import { useStudentsData } from "@/hooks/useStudentsData";
import { useEffect, useState } from "react";
import {
  getStudentsByEtape,
  getStudentsValidationByEtape,
  search,
  searchStudents,
} from "@/lib/axios/studentsData";
import { DownloadDialog } from "./DownloadDialog";
import { Pagination } from "../../global/Pagination";
import { pageLength } from "@/constants/pagination";
import { SearchForm } from "../../global/Search";
import { AddStudentDialog } from "./addStudent";
import { studentsFileupload } from "@/lib/axios/studentsFileUpload";
import { StudentsFileDialog } from "@/components/global/StudentsFileDialog";
import { useTabs } from "@/hooks/useTabs";
import { Screen } from "@/enums/Screens";

export function StudentsListNavbar() {
  const [downloadDialogState, setDownloadDialogState] =
    useState<boolean>(false);
  const { setData, data, semester, setSemester, SVOption } = useStudentsData();
  const { navigateTo, data: tabsSharedData } = useTabs();
  const [pageNum, setPageNum] = useState<number>(1);
  const [morePage, setMorePages] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [fileUploadedDialogOpen, setFileUploadedDialog] = useState(false);

  useEffect(() => {
    if (!fileUploadedDialogOpen) {
      dialogOpenChangeHandler(pageNum, pageLength);
    }
  }, [fileUploadedDialogOpen]);

  async function dialogOpenChangeHandler(pageNum: number, pageLength: number) {
    // re-fetch students from the DB afetr file upload
    console.log(pageNum, pageLength);

    // setData(newData);
    setFileUploadedDialog(false);
  }

  useEffect(() => {
    if (semester !== "") {
      if (SVOption == "validation")
        getStudentsValidationByEtape(setData, pageLength, pageNum, semester);
      if (SVOption == "students")
        getStudentsByEtape(setData, pageLength, pageNum, semester);
    }
  }, [semester, setData, pageNum, SVOption]);

  useEffect(() => {
    getStudentsByEtape(setData, pageLength, pageNum, semester);
  }, []);

  useEffect(() => {
    setSemester((tabsSharedData as { etapeCode: string }).etapeCode ?? "");
  }, []);

  useEffect(() => {
    if (data.length < pageLength) setMorePages(false);
    else setMorePages(true);
  }, [data]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      if (SVOption == "validation")
        search(setData, searchQuery, pageLength, pageNum, semester);
      if (SVOption == "students")
        searchStudents(setData, searchQuery, pageLength, pageNum, semester);
    }
    if (searchQuery.length == 0) {
      if (SVOption == "validation")
        getStudentsValidationByEtape(setData, pageLength, pageNum, semester);
      if (SVOption == "students")
        getStudentsByEtape(setData, pageLength, pageNum, semester);
    }
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-4">
      <div className="h-full w-auto flex items-center gap-4">
        <Button
          onClick={() => navigateTo(Screen.EtapeList)}
          className="bg-slate-100 hover:bg-slate-200 transition-all duration-200 ease-in text-slate-700 px-2"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <SearchForm
          className="w-[400px]"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="h-full w-auto flex items-center gap-4">
        <Pagination pageNum={pageNum} setPageNum={setPageNum} more={morePage} />
        <EtapeCodeInput />
        <StudentsDataOptions pageNum={pageNum} pageLength={pageLength} />
        <Button
          onClick={() => setDownloadDialogState(true)}
          className="text-white bg-sky-500 hover:bg-sky-700 flex items-center gap-2"
        >
          Download <Download size={20} />
        </Button>
        <AddStudentDialog>
          <Button className="text-white bg-sky-500 hover:bg-sky-700 flex items-center gap-2">
            student <Plus size={20} className="text-white ml-2" />
          </Button>
        </AddStudentDialog>
      </div>
      <DownloadDialog
        open={downloadDialogState}
        onOpenChane={() => setDownloadDialogState(false)}
      />
      <Button
        onClick={() => setFileDialogOpen(true)}
        className="text-white bg-sky-500 hover:bg-sky-700"
      >
        Charger <FileUp size={20} className="text-white ml-2" />
      </Button>
      <StudentsFileDialog
        fileUploader={studentsFileupload}
        open={fileDialogOpen}
        setFileUploadedDialog={setFileUploadedDialog}
        setOpen={setFileDialogOpen}
      />
    </div>
  );
}
