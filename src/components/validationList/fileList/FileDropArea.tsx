import { setStateType } from "@/types/setState";
import { FileSpreadsheet } from "lucide-react";
import { useDropzone } from "react-dropzone";

type FileDropAreaProps = {
  uploadedFiles: File[];
  setUploadedFiles: setStateType<File[]>;
};

export function FileDropArea({
  uploadedFiles,
  setUploadedFiles,
}: FileDropAreaProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  return (
    <div className="h-auto max-h-[500px] overflow-y-auto">
      <div
        className="w-full h-32 py-4 flex items-center justify-center bg-slate-100 rounded"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-slate-600">
          Drag and drop files here or click to browse.
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {uploadedFiles.map((file) => (
          <div
            className="py-2 px-4 bg-slate-100 text-slate-500 rounded flex items-center justify-start gap-4"
            key={file.name}
          >
            <FileSpreadsheet className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
