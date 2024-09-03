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
import { HTMLAttributes, useState } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addEtape } from "@/lib/axios/etapes/addEtape";
import { EtapeDataType } from "@/types/EtapeDataType";
import { setStateType } from "@/types/setState";
import toast from "react-hot-toast";

interface GroupDialogProps extends HTMLAttributes<HTMLDivElement> {
  data: EtapeDataType[];
  setData: setStateType<EtapeDataType[]>;
}

export function AddBranchDialog({ children, setData }: GroupDialogProps) {
  const [open, setOpen] = useState<boolean>();
  const [etapeCode, setEtapeCode] = useState<string>("");
  const [etapeName, setEtapeName] = useState<string>("");
  const [error, setError] = useState<string>("");

  function validate() {
    if (etapeCode.length == 0) {
      setError("Veuillez saisir un code d'étape");
      return false;
    } else if (etapeName.length == 0) {
      setError("Veuillez saisir un nom d'étape");
      return false;
    } else {
      setError("");
      return true;
    }
  }

  async function handleSubmitClick() {
    toast.promise(
      (async () => {
        if (validate()) {
          const data = await addEtape(etapeCode, etapeName);
          if (data != null) {
            setOpen(false);
            setData((prev) => [
              {
                code: etapeCode,
                nom: etapeName,
                semester: "unknown",
                etudiants: 0,
                modules: 0,
              },
              ...prev,
            ]);
          } else {
            setError("Erreur lors de l'ajout de l'étape");
            throw new Error(
              "Une erreur est survenue lors de l'ajout de l'étape"
            );
          }
        } else {
          throw new Error(
            "Une erreur est survenue lors de la validation des données"
          );
        }
      })(),
      {
        loading:
          "En cours de traitement, veuillez patienter quelques instants...",
        success: "L'étape a été ajoutée avec succès",
        error: "Erreur lors de l'ajout de l'étape",
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Ajouter une étape</DialogTitle>
          <DialogDescription>Ajoutez une étape à votre list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error.length > 0 && (
            <Alert variant={"destructive"}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Etape Code
            </Label>
            <Input
              min={1}
              placeholder={"Ex: ABCD1234"}
              value={etapeCode}
              onChange={(e) => {
                setEtapeCode(e.target.value);
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-1">
              Etape Name
            </Label>
            <Input
              min={1}
              value={etapeName}
              onChange={(e) => {
                setEtapeName(e.target.value);
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Ex: Première année 'quelque chose'"}
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
