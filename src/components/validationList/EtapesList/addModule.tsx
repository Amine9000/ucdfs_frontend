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
import { fetchEtapes } from "@/lib/axios/fetchEtapes";
import { addModule } from "@/lib/axios/addModule";

interface GroupDialogProps extends HTMLAttributes<HTMLDivElement> {
  data: EtapeDataType[];
  setData: setStateType<EtapeDataType[]>;
}

const animatedComponents = makeAnimated();

export function AddModuleDialog({ children, data, setData }: GroupDialogProps) {
  const [open, setOpen] = useState<boolean>();
  const [moduleName, setModuleName] = useState<string>("");
  const [moduleCode, setModuleCode] = useState<string>("");
  const [branches, setBranches] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedBranches, setSelectedBranches] = useState<
    { value: string; label: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetchBranches() {
    const res = await fetchEtapes();
    const newBranches = res?.data.map(
      (branch: { etape_code: string; etape_name: string }) => ({
        value: branch.etape_code,
        label: branch.etape_name,
      })
    );
    setBranches(newBranches);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchBranches();
  }, [open]);

  async function handleSubmitClick() {
    if (selectedBranches.length == 0) {
      setError("Veuillez choisir au moins une branche");
    } else if (moduleName.length == 0) {
      setError("Veuillez entrer un nom de module");
    } else if (moduleCode.length == 0) {
      setError("Veuillez entrer un code de module");
    } else {
      setError("");
    }
    const selectedEtapes = selectedBranches.map((br) => br.value);
    const res = await addModule(moduleName, moduleCode, selectedEtapes);
    if (res?.status == 201) {
      const ntetapes = data.map((etape) => {
        if (selectedEtapes.includes(etape.code)) etape.modules++;
        return etape;
      });
      setData(ntetapes);
      setOpen(false);
      setError("");
    } else {
      setError("Erreur lors de l'ajout de l'étape");
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
              Etape
            </Label>
            <Select
              isMulti
              isLoading={isLoading}
              components={animatedComponents}
              onChange={(selectedBr) => {
                setSelectedBranches(
                  selectedBr as { value: string; label: string }[]
                );
              }}
              name="filières"
              options={branches}
              className="basic-multi-select col-span-6"
              classNamePrefix="select"
              placeholder={`choisir parmi les ${branches.length} filières`}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Code
            </Label>
            <Input
              min={1}
              value={moduleCode}
              onChange={(e) => {
                setModuleCode(e.target.value);
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: SFP24404"}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Name
            </Label>
            <Input
              min={1}
              value={moduleName}
              onChange={(e) => {
                setModuleName(e.target.value);
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: Mécanique quantique"}
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
