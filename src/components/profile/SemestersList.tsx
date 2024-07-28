import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Semester } from "@/types/Semester";

interface SemestersListProps {
  semesters: Semester[];
  handleSemesterSelection: (code: string) => void;
}

export function SemestersList({
  semesters,
  handleSemesterSelection,
}: SemestersListProps) {
  return (
    <Select
      defaultValue={semesters.length > 0 ? semesters[0].semester_code : ""}
      onValueChange={(v) => handleSemesterSelection(v)}
    >
      <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0 border-none bg-slate-100">
        <SelectValue
          className="text-slate-600"
          placeholder="Select a semester"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-slate-500">Semesters</SelectLabel>
          {semesters.map((semester) => {
            return (
              <SelectItem
                key={semester.semester_code}
                value={semester.semester_code}
              >
                {semester.semester_name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
