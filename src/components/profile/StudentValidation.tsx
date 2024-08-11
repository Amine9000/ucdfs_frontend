import { HTMLAttributes, useEffect, useState } from "react";
import { SemestersList } from "./SemestersList";
import { getStudentSemesters } from "@/lib/axios/fetchStudentData";
import { Semester } from "@/types/Semester";

interface StudentValidationProps extends HTMLAttributes<HTMLDivElement> {
  className: string;
}

export function StudentValidation({ className }: StudentValidationProps) {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemesters, setSelectedSemesters] = useState<Semester | null>(
    null
  );

  async function fetchSemesters() {
    const nSemesters: Semester[] | undefined = await getStudentSemesters();
    if (nSemesters) setSemesters(nSemesters);
  }
  useEffect(() => {
    fetchSemesters();
  }, []);

  function handleSemesterSelection(code: string) {
    const selectedSms = semesters.filter((sms) => sms.semester_code == code);
    if (selectedSms.length > 0) setSelectedSemesters(selectedSms[0]);
    else setSelectedSemesters(null);
  }

  return (
    <div className={className}>
      <div className="w-full h-auto mb-4">
        <div className="flex items-center justify-between px-4">
          <span className="text-gray-600 h-12 flex items-center font-bold">
            Validation
          </span>
          <SemestersList
            semesters={semesters}
            handleSemesterSelection={handleSemesterSelection}
          />
        </div>
        <div className="border-b"></div>
      </div>
      <div className="w-full h-auto px-4 flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          {selectedSemesters != null &&
            selectedSemesters?.modules.length > 0 &&
            Object.keys(selectedSemesters?.modules[0]).map((key) => {
              return (
                <div
                  key={key}
                  className="w-1/2 h-auto py-2 text-sm text-blue-500 bg-slate-100 px-4 rounded uppercase"
                >
                  {key}
                </div>
              );
            })}
        </div>
        {selectedSemesters != null ? (
          selectedSemesters?.modules.map((mod) => {
            return (
              <div key={mod.nom} className="flex justify-between gap-4">
                <div className="w-1/2 h-auto py-2 text-sm text-gray-900 bg-slate-50 px-4 rounded">
                  {mod.nom}
                </div>
                <div className="w-1/2 h-auto py-2 text-sm text-gray-500 px-4">
                  {mod.status}
                </div>
              </div>
            );
          })
        ) : (
          <small className="text-gray-500 text-center text-sm">
            Aucun module n'a été trouvé. Veuillez en sélectionner une semester
            s'il y en a.
          </small>
        )}
      </div>
    </div>
  );
}
