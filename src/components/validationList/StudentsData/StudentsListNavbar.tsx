import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Plus } from "lucide-react";
import { StudentsDataOptions } from "./StudentsDataOptions";
import { EtapeName } from "./EtapeName";
import { useStudentsData } from "@/hooks/useStudentsData";
import { useEffect, useState } from "react";
import { DownloadDialog } from "./DownloadDialog";
import { Pagination } from "../../global/Pagination";
import { pageLength } from "@/constants/pagination";
import { SearchForm } from "../../global/Search";
import { AddStudentDialog } from "./addStudent";
import { studentsFileupload } from "@/lib/axios/students/studentsFileUpload";
import { StudentsFileDialog } from "@/components/global/StudentsFileDialog";
import { useTabs } from "@/hooks/useTabs";
import { Screen } from "@/enums/Screens";
import { getStudentsValidationByEtape } from "@/lib/axios/students/getStudentsValidationByEtape";
import { getStudentsByEtape } from "@/lib/axios/students/getStudentsByEtape";
import { search } from "@/lib/axios/students/search";
import { searchStudents } from "@/lib/axios/students/searchStudents";
import { DataRecord } from "@/types/DataRecord";

export function StudentsListNavbar() {
  const [downloadDialogState, setDownloadDialogState] =
    useState<boolean>(false);
  const { setData, data, semester, setSemester, SVOption } = useStudentsData();
  const { navigateTo, data: tabsSharedData } = useTabs();
  const [pageNum, setPageNum] = useState<number>(1);
  const [morePage, setMorePages] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  async function fetchStudents() {
    if (SVOption == "validation")
      getStudentsValidationByEtape(setData, pageLength, pageNum, semester.code);
    if (SVOption == "students")
      getStudentsByEtape(setData, pageLength, pageNum, semester.code);
  }

  async function updateData() {
    if (searchQuery.length > 0) {
      if (SVOption == "validation")
        search(setData, searchQuery, pageLength, pageNum, semester.code);
      if (SVOption == "students")
        searchStudents(
          setData,
          searchQuery,
          pageLength,
          pageNum,
          semester.code
        );
    }
    if (searchQuery.length == 0) {
      fetchStudents();
    }
  }

  useEffect(() => {
    if (semester.code !== "") {
      fetchStudents();
    }
  }, [semester, setData, pageNum, SVOption]);

  useEffect(() => {
    getStudentsByEtape(setData, pageLength, pageNum, semester.code);
    setSemester({
      name:
        (tabsSharedData as { etapeName: string; etapeCode: string })
          .etapeName ?? "",
      code:
        (tabsSharedData as { etapeCode: string; etapeName: string })
          .etapeCode ?? "",
    });
  }, []);

  useEffect(() => {
    if (data.length < pageLength) setMorePages(false);
    else setMorePages(true);
  }, [data]);

  useEffect(() => {
    updateData();
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
        <EtapeName />
        <StudentsDataOptions pageNum={pageNum} pageLength={pageLength} />
        <StudentsFileDialog
          fileUploader={async (
            file: File | null,
            modules: { module_code: string; etape_code: string }[]
          ) => {
            const ndata = await studentsFileupload(file, modules);
            if (ndata != null) setData([...data, ...(ndata as DataRecord[])]);
          }}
        />
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
    </div>
  );
}
