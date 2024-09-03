import { FileCog, FileText } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useStudentsData } from "@/hooks/useStudentsData";
import { getStudentsValidationByEtape } from "@/lib/axios/students/getStudentsValidationByEtape";
import { getStudentsByEtape } from "@/lib/axios/students/getStudentsByEtape";

type FileContentOptionsProps = {
  pageNum: number;
  pageLength: number;
};

export function StudentsDataOptions({
  pageNum,
  pageLength,
}: FileContentOptionsProps) {
  const { setData, semester, setSVOption } = useStudentsData();

  return (
    <ToggleGroup defaultValue="students" type="single">
      <ToggleGroupItem
        onClick={() => {
          setSVOption("validation");
          getStudentsValidationByEtape(
            setData,
            pageLength,
            pageNum,
            semester.code
          );
        }}
        value="validation"
        aria-label="Toggle Validation"
        className="flex items-center gap-2 text-slate-500"
      >
        <FileCog size={20} /> état d'inscription
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => {
          setSVOption("students");
          getStudentsByEtape(setData, pageLength, pageNum, semester.code);
        }}
        value="students"
        aria-label="Toggle Content"
        className="flex items-center gap-2 text-slate-500"
      >
        <FileText size={20} /> Etudiants
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
