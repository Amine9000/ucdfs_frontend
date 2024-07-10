import { Button } from "@/components/ui/button";
import { useScreen } from "@/hooks/useScreen";
import { ChevronLeft, Download, PenLine } from "lucide-react";
import { FileContentOptions } from "./FileContentOptions";
import { FileInputs } from "./FileInputs";
import { useFileData } from "@/hooks/useFileData";
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

export function FileDataNavbar() {
  const [downloadDialogState, setDownloadDialogState] =
    useState<boolean>(false);
  const { screenSelectedHandler, screen } = useScreen();
  const { setData, data, semester, setSemester } = useFileData();
  const [pageNum, setPageNum] = useState<number>(1);
  const [morePage, setMorePages] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [option, setOption] = useState<string>("students");

  useEffect(() => {
    if (semester !== "") {
      if (option == "validation")
        getStudentsValidationByEtape(setData, pageLength, pageNum, semester);
      if (option == "students")
        getStudentsByEtape(setData, pageLength, pageNum, semester);
    }
  }, [semester, setData, pageNum, option]);

  useEffect(() => {
    getStudentsByEtape(setData, pageLength, pageNum, semester);
  }, []);

  useEffect(() => {
    setSemester(screen?.etape_code ?? "");
  }, []);

  useEffect(() => {
    if (data.length < pageLength) setMorePages(false);
    else setMorePages(true);
  }, [data]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      if (option == "validation")
        search(setData, searchQuery, pageLength, pageNum, semester);
      if (option == "students")
        searchStudents(setData, searchQuery, pageLength, pageNum, semester);
    }
    if (searchQuery.length == 0) {
      if (option == "validation")
        getStudentsValidationByEtape(setData, pageLength, pageNum, semester);
      if (option == "students")
        getStudentsByEtape(setData, pageLength, pageNum, semester);
    }
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-4">
      <div className="h-full w-auto flex items-center gap-4">
        <Button
          onClick={() =>
            screenSelectedHandler != null && screenSelectedHandler("fileList")
          }
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
        <FileInputs />
        <FileContentOptions
          setOption={setOption}
          pageNum={pageNum}
          pageLength={pageLength}
        />
        <Button
          onClick={() => setDownloadDialogState(true)}
          className="text-white bg-sky-500 hover:bg-sky-700 flex items-center gap-2"
        >
          Download <Download size={20} />
        </Button>
        <Button
          onClick={() => console.log("Updated")}
          className="text-white bg-sky-500 hover:bg-sky-700 flex items-center gap-2"
        >
          Update <PenLine size={20} />
        </Button>
      </div>
      <DownloadDialog
        open={downloadDialogState}
        onOpenChane={() => setDownloadDialogState(false)}
      />
    </div>
  );
}
