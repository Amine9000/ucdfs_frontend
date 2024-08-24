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
import Select from "react-select";
import { HTMLAttributes, useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import { Input } from "@/components/ui/input";
import { fetchEtapes } from "@/lib/axios/fetchEtapes";
import { meregerBranchs } from "@/lib/axios/mergeBranches";
import { useEtapesData } from "@/hooks/useEtapesData";
import { ToastError } from "@/lib/ToastError";

const animatedComponents = makeAnimated();

interface GroupDialogProps extends HTMLAttributes<HTMLDivElement> {}

export function GroupDialog({ children }: GroupDialogProps) {
  const [branches, setBranches] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedBranches, setSelectedBranches] = useState<
    { value: string; label: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(true);
  const [NomBranch, setNomBranch] = useState<string>("");
  const [codeBranch, setCodeBranch] = useState<string>("");
  const { setEtapes } = useEtapesData();

  async function fetchBranches() {
    const res = await fetchEtapes();
    const newBranches = res?.data.map(
      (branch: { etape_code: string; etape_name: string }) => ({
        value: branch.etape_code,
        label: branch.etape_name,
      })
    );
    if (newBranches) setBranches(newBranches);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchBranches();
  }, []);

  async function handleDownloadButton() {
    if (
      selectedBranches.length > 0 &&
      NomBranch.length > 0 &&
      codeBranch.length > 0
    ) {
      const etapes = await meregerBranchs(
        selectedBranches.map((b) => b.value),
        NomBranch,
        codeBranch
      );
      if (etapes) {
        // clear all data and set etapes and close dialog
        setEtapes(etapes);
        setOpen(false);
        setNomBranch("");
        setCodeBranch("");
      }
    } else {
      ToastError("vous devez remplir tous les dossiers.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Créer un groupe</DialogTitle>
          <DialogDescription>
            Créez un groupe pour les étudiants de votre équipe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              filières
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
              Code de la filière
            </Label>
            <Input
              type="text"
              value={codeBranch}
              onChange={(e) => {
                setCodeBranch(e.target.value);
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Nom de la filière
            </Label>
            <Input
              type="text"
              value={NomBranch}
              onChange={(e) => {
                setNomBranch(e.target.value);
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleDownloadButton} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
