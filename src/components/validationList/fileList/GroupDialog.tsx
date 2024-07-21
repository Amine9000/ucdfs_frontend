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
import { getProccessedDataFileByEtapes } from "@/lib/axios/downlaodMergedEtapesFiles";

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
  const [NGroupes, setNGroupes] = useState<number>(1);

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
  }, []);

  useEffect(() => {
    console.log(selectedBranches);
  }, [selectedBranches]);

  function handleDownloadButton() {
    getProccessedDataFileByEtapes(
      selectedBranches.map((b) => b.value),
      NGroupes
    );
    console.log(selectedBranches);
  }

  return (
    <Dialog>
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
              N.Groupes
            </Label>
            <Input
              type="number"
              min={1}
              value={NGroupes}
              onChange={(e) => {
                if (parseInt(e.target.value) > 0)
                  setNGroupes(parseInt(e.target.value));
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
