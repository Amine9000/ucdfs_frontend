import { Input } from "@/components/ui/input";
import { useStudentsData } from "@/hooks/useStudentsData";

export function EtapeCodeInput() {
  const { semester, setSemester } = useStudentsData();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Input
          value={semester}
          onChange={(e) => e && setSemester(e.target.value)}
          type="text"
          placeholder="Code etape"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
