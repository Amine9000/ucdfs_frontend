import { Input } from "@/components/ui/input";
import { useFileData } from "@/hooks/useFileData";

export function FileInputs() {
  const { semester, setSemester } = useFileData();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Input
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          type="text"
          placeholder="Code etape"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
