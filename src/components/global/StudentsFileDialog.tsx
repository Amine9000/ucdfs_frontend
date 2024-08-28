import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileDropArea } from "./FileDropArea";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { fetchModules } from "@/lib/axios/etapes/fetchModules";
import { useStudentsData } from "@/hooks/useStudentsData";
import { Upload } from "lucide-react";

const animatedComponents = makeAnimated();

type FileDialogProps = {
  fileUploader: (file: File | null, modules: string[]) => Promise<void>;
};

export function StudentsFileDialog({ fileUploader }: FileDialogProps) {
  const { semester } = useStudentsData();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedModules, setSelectedModules] = useState<
    { label: string; value: string }[]
  >([]);
  const [modules, setModules] = useState<{ label: string; value: string }[]>(
    []
  );
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getModules() {
    const res = await fetchModules(semester);
    const modules = res?.data.map(
      (module: { module_name: string; module_code: string }) => ({
        label: module.module_name,
        value: module.module_code,
      })
    );
    setModules(modules);
    setIsLoading(false);
  }

  useEffect(() => {
    if (semester.length > 0) getModules();
  }, [semester]);

  async function handleFileUpload() {
    fileUploader(
      uploadedFile,
      selectedModules.map((mod) => mod.value)
    ).then(() => {
      setUploadedFile(null);
      setOpen(false);
    });
  }

  function handleSubmit() {
    if (selectedModules.length > 0) {
      toast.promise(handleFileUpload(), {
        loading: "Uploading ...",
        success: (
          <p className="text-teal-600">
            votre fichier a été téléchargé avec succès.
          </p>
        ),
        error: <p className="text-red-500">Could not upload file.</p>,
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-10 rounded-md text-gray-700 bg-gray-50 hover:bg-gray-50 px-4 hover:text-sky-600">
        <Upload size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-start gap-4">
          <Label htmlFor="name">Modules</Label>
          <Select
            isMulti
            isLoading={isLoading}
            components={animatedComponents}
            onChange={(selectedMds) => {
              setSelectedModules(
                selectedMds as { value: string; label: string }[]
              );
            }}
            name="modules"
            options={modules}
            className="basic-multi-select w-full"
            classNamePrefix="select"
            placeholder={`choisir parmi les ${modules.length} module.`}
          />
        </div>
        <FileDropArea
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
