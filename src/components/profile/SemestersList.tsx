import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const semesters = [
  { value: "S1", label: "Semester 1" },
  { value: "S2", label: "Semester 2" },
  { value: "S3", label: "Semester 3" },
  { value: "S4", label: "Semester 4" },
  { value: "S5", label: "Semester 5" },
  { value: "S6", label: "Semester 6" },
];

export function SemestersList() {
  return (
    <Select>
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
              <SelectItem key={semester.value} value={semester.value}>
                {semester.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
