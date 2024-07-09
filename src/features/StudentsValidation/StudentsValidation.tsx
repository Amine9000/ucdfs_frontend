import { StudentValidation } from "@/components/profile/StudentValidation";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface StudentsValidationProps extends HTMLAttributes<HTMLDivElement> {}

export function StudentsValidationTab({ className }: StudentsValidationProps) {
  return (
    <div
      className={cn(className, "w-full h-full flex items-start justify-center")}
    >
      <StudentValidation className="bg-white p-2 rounded w-full lg:w-2/3 h-auto" />
    </div>
  );
}
