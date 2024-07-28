import { useStudentsData } from "@/hooks/useStudentsData";
import { StudentsTable } from "./StudentsTable";

export function StudentsData() {
  const { data } = useStudentsData();

  return (
    <div className="w-full flex-grow p-4 bg-white rounded flex items-start justify-center overflow-y-auto">
      {data.length == 0 && (
        <p className="text-sm text-slate-600">Aucun étudiant inscrit.</p>
      )}
      {data.length > 0 && <StudentsTable />}
    </div>
  );
}
