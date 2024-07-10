import { FileCog, FileText } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFileData } from "@/hooks/useFileData";
import {
  getStudentsByEtape,
  getStudentsValidationByEtape,
} from "@/lib/axios/studentsData";
import { setStateType } from "@/types/setState";

type FileContentOptionsProps = {
  pageNum: number;
  pageLength: number;
  setOption: setStateType<string>;
};

export function FileContentOptions({
  pageNum,
  pageLength,
  setOption,
}: FileContentOptionsProps) {
  const { setData, semester } = useFileData();

  return (
    <ToggleGroup defaultValue="students" type="single">
      <ToggleGroupItem
        onClick={() => {
          setOption("validation");
          getStudentsValidationByEtape(setData, pageLength, pageNum, semester);
        }}
        value="validation"
        aria-label="Toggle Validation"
        className="flex items-center gap-2 text-slate-500"
      >
        <FileCog size={20} /> Validation
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => {
          setOption("students");
          getStudentsByEtape(setData, pageLength, pageNum, semester);
        }}
        value="students"
        aria-label="Toggle Content"
        className="flex items-center gap-2 text-slate-500"
      >
        <FileText size={20} /> Students
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
