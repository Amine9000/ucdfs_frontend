import { setStateType } from "@/types/setState";
import { FileSpreadsheet } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

type FileDropAreaProps = {
  uploadedFile: File | null;
  setUploadedFile: setStateType<File | null>;
};

export function FileDropArea({
  uploadedFile,
  setUploadedFile,
}: FileDropAreaProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        // Validate file type and size
        const isValidType = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ].includes(file.type);
        const isValidSize = file.size <= MAX_FILE_SIZE; // 5 MB limit
        if (!isValidType) {
          toast.error(`Invalid file type: ${file.type}`);
        }
        if (!isValidSize) {
          // two digits after the comma floating number
          toast.error(
            `File size is too large: ${(file.size / 1024 / 1024).toFixed(2)} MB`
          );
        }
        return isValidType && isValidSize;
      });

      if (filteredFiles.length > 0) {
        setUploadedFile(filteredFiles[0]);
      }
    },
    multiple: false,
  });
  return (
    <div className="h-auto max-h-[500px] overflow-y-auto">
      <div
        className="relative w-full h-32 py-4 flex items-center justify-center bg-slate-100 rounded"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <small className="absolute top-1 right-1 rounded-sm px-2 py-1 bg-slate-50 text-slate-800 text-sm">
          Max size : 5 Mb
        </small>
        <p className="text-slate-600 flex flex-col gap-1 items-center">
          Drag and drop files here or click to browse.
          <span className="text-sm text-slate-800">
            Only 1 excel file allowed
          </span>
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {uploadedFile && (
          <div
            className="py-2 px-4 bg-slate-100 text-slate-500 rounded flex items-center justify-start gap-4"
            key={uploadedFile?.name ?? "no-file"}
          >
            <FileSpreadsheet className="h-4 w-4 flex-shrink-0" />
            <small className="text-sm truncate">
              {uploadedFile?.name ?? "No file"}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
