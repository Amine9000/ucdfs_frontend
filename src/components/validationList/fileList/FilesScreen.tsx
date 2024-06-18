import { FileList } from "./FileList";
import { FileListNavbar } from "./FileListNavbar";

export function FileScreen() {
  return (
    <div className="w-full h-full flex-grow flex-shrink-0 flex flex-col items-center justify-start gap-2">
      <FileListNavbar />
      <FileList />
    </div>
  );
}
