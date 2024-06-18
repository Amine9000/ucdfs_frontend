import { FileDataProvider } from "@/context/FileData";
import { FileData } from "./FileData";
import { FileDataNavbar } from "./FileDataNavbar";

export function FileDataScreen() {
  return (
    <div className="w-full h-full flex-grow flex-shrink-0 flex flex-col items-center justify-start gap-2">
      <FileDataProvider>
        <FileDataNavbar />
        <FileData />
      </FileDataProvider>
    </div>
  );
}
