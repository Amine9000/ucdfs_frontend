import { useStudentsData } from "@/hooks/useStudentsData";

export function EtapeName() {
  const { semester } = useStudentsData();

  return (
    <div className="flex items-center gap-4 ">
      <div className="flex items-center gap-2">
        <span className="w-auto px-4 text-sky-900 bg-accent font-medium rounded h-10 flex items-center justify-center text-sm">
          {semester.name}
        </span>
      </div>
    </div>
  );
}
