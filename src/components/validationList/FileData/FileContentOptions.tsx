import { FileCog, FileText } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useFileData } from "@/hooks/useFileData";
import {
  getStudentsByEtape,
  getStudentsValidationByEtape,
} from "@/lib/axios/studentsData";
import { useEffect, useState } from "react";

export function FileContentOptions() {
  const { setData, semester } = useFileData();
  const [option, setOption] = useState<string>("students");
  useEffect(() => {
    console.log(option);
    if (semester !== "") {
      if (option == "validation")
        getStudentsValidationByEtape(setData, semester);
      if (option == "students") getStudentsByEtape(setData, semester);
    }
  }, [semester, setData, option]);

  return (
    <ToggleGroup defaultValue="students" type="single">
      <ToggleGroupItem
        onClick={() => {
          setOption("validation");
          getStudentsValidationByEtape(setData, semester);
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
          getStudentsByEtape(setData, semester);
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
