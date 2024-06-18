import { Button } from "@/components/ui/button";
import { useScreen } from "@/hooks/useScreen";
import { ChevronLeft, Download, PenLine } from "lucide-react";
import { FileContentOptions } from "./FileContentOptions";
import { FileInputs } from "./FileInputs";
import { useFileData } from "@/hooks/useFileData";
import { useEffect, useState } from "react";
import { getStudentsByEtape } from "@/lib/axios/fileData";
import { DownloadDialog } from "./DownloadDialog";

export function FileDataNavbar() {
  const [downloadDialogState, setDownloadDialogState] =
    useState<boolean>(false);
  const { screenSelectedHandler, screen } = useScreen();
  const { setData, semester, setSemester } = useFileData();
  useEffect(() => {
    getStudentsByEtape(setData, semester);
  }, []);

  useEffect(() => {
    setSemester(screen?.etape_code ?? "");
  }, []);

  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-4">
      <Button
        onClick={() =>
          screenSelectedHandler != null && screenSelectedHandler("fileList")
        }
        className="bg-slate-100 hover:bg-slate-200 transition-all duration-200 ease-in text-slate-700 px-2"
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div className="h-full w-auto flex items-center gap-4">
        <FileInputs />
        <FileContentOptions />
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
