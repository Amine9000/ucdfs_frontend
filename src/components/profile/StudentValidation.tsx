import { HTMLAttributes, useEffect } from "react";
import { SemestersList } from "./SemestersList";
import { getStudentSemesters } from "@/lib/axios/fetchStudentData";

interface StudentValidationProps extends HTMLAttributes<HTMLDivElement> {
  className: string;
}

export function StudentValidation({ className }: StudentValidationProps) {
  async function fetchSemesters() {
    await getStudentSemesters();
  }
  useEffect(() => {
    fetchSemesters();
  }, []);
  return (
    <div className={className}>
      <div className="w-full h-auto mb-4">
        <div className="flex items-center justify-between px-4">
          <span className="text-gray-600 h-12 flex items-center font-bold">
            Validation
          </span>
          <SemestersList />
        </div>
        <div className="border-b"></div>
      </div>
      <div className="w-full h-auto px-4 flex flex-col gap-2">
        {/* row */}
        <div className="flex justify-between gap-4">
          <div className="w-1/2 h-auto py-2 text-sm text-gray-900 bg-slate-100 px-4 rounded">
            Math
          </div>
          <div className="w-1/2 h-auto py-2 text-sm text-gray-500">I</div>
        </div>
        {/* end row */}
        {/* row */}
        <div className="flex justify-between gap-4">
          <div className="w-1/2 h-auto py-2 text-sm text-gray-900 bg-slate-100 px-4 rounded">
            physics
          </div>
          <div className="w-1/2 h-auto py-2 text-sm text-gray-500">NI</div>
        </div>
        {/* end row */}
      </div>
    </div>
  );
}
