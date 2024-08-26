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
import { Label } from "@/components/ui/label";
import { HTMLAttributes, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EtapeDataType } from "@/types/EtapeDataType";
import { setStateType } from "@/types/setState";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { DatePicker } from "./DatePicker";
import { StudentDataType } from "@/types/studentDataType";
import { addStudent } from "@/lib/axios/addStudent";
import { fetchModules } from "@/lib/axios/fetchModules";
import { useStudentsData } from "@/hooks/useStudentsData";

interface GroupDialogProps extends HTMLAttributes<HTMLDivElement> {
  data?: EtapeDataType[];
  setData?: setStateType<EtapeDataType[]>;
}

const animatedComponents = makeAnimated();

export function AddStudentDialog({ children }: GroupDialogProps) {
  const { semester } = useStudentsData();
  const [open, setOpen] = useState<boolean>();
  const [error, setError] = useState<string>("");
  const [selectedModules, setSelectedModules] = useState<
    { label: string; value: string }[]
  >([]);
  const [modules, setModules] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [student, setStudent] = useState<StudentDataType>({
    student_code: "",
    student_fname: "",
    student_lname: "",
    student_cne: "",
    student_cin: "",
    student_birthdate: "1900-01-01",
    student_pwd: "",
    modules: [],
  });

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

  async function handleSubmitClick() {
    setIsLoading(true);
    if (student.student_code.length === 0) setError("Code est obligatoire");
    if (student.student_fname.length === 0) setError("Nom est obligatoire");
    if (student.student_lname.length === 0) setError("Prenom est obligatoire");
    if (student.student_cin.length === 0) setError("CIN est obligatoire");
    if (student.student_cne.length === 0) setError("CNE est obligatoire");
    if (student.student_pwd.length === 0) setError("Password est obligatoire");
    if (!student.student_birthdate)
      setError("Date de naissance est obligatoire");
    if (selectedModules.length === 0) setError("Modules sont obligatoires");
    if (error.length > 0) {
      setIsLoading(false);
      return;
    }
    const response = await addStudent({
      ...student,
      student_birthdate: student.student_birthdate,
      modules: selectedModules.map((md) => md.value),
    });
    if (response && response.status === 200) {
      setIsLoading(false);
      setStudent({
        student_code: "",
        student_fname: "",
        student_lname: "",
        student_cin: "",
        student_birthdate: "1900-01-01",
        student_pwd: "",
        student_cne: "",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Module</DialogTitle>
          <DialogDescription>Ajoutez un module à votre list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error.length > 0 && (
            <Alert variant={"destructive"}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Modules
            </Label>
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
              className="basic-multi-select col-span-6"
              classNamePrefix="select"
              placeholder={`choisir parmi les ${modules.length} module.`}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Code
            </Label>
            <Input
              min={1}
              value={student?.student_code}
              onChange={(e) => {
                setStudent({
                  ...student,
                  student_code: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: 100200300"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Nom
            </Label>
            <Input
              min={1}
              value={student?.student_lname}
              onChange={(e) => {
                setStudent({
                  ...student,
                  student_lname: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: Ali"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Prenom
            </Label>
            <Input
              min={1}
              value={student?.student_fname}
              onChange={(e) => {
                setStudent({
                  ...student,
                  student_fname: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: Adam"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              CIN
            </Label>
            <Input
              min={1}
              value={student?.student_cin}
              onChange={(e) => {
                setStudent({
                  ...student,
                  student_cin: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: M123456"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              CNE
            </Label>
            <Input
              min={1}
              value={student?.student_cne}
              onChange={(e) => {
                setStudent({
                  ...student,
                  student_cne: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: L172683296"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Password
            </Label>
            <Input
              min={1}
              type="password"
              value={student?.student_pwd}
              onChange={(e) => {
                setStudent({
                  ...student,
                  student_pwd: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: L172683296"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Date de naissanse
            </Label>
            <DatePicker
              onChange={(date) => {
                setStudent({
                  ...student,
                  student_birthdate: `${date.getFullYear()}-${
                    date.getMonth() + 1 < 10
                      ? "0" + (date.getMonth() + 1)
                      : date.getMonth() + 1
                  }-${
                    date.getDate() + 1 < 10
                      ? "0" + (date.getDate() + 1)
                      : date.getDate() + 1
                  }`,
                });
              }}
              className="col-span-6"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmitClick} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
