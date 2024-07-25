import { StudentsDataProvider } from "@/context/StudentsData";
import { StudentsData } from "./StudentsData";
import { StudentsListNavbar } from "./StudentsListNavbar";

export function StudentsListScreen() {
  return (
    <div className="w-full h-full flex-grow flex-shrink-0 flex flex-col items-center justify-start gap-2">
      <StudentsDataProvider>
        <StudentsListNavbar />
        <StudentsData />
      </StudentsDataProvider>
    </div>
  );
}
