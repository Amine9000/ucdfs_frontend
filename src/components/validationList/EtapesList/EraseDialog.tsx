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
import { useEtapesData } from "@/hooks/useEtapesData";
import { eraseAllData } from "@/lib/axios/eraseAll/eraseAllData";
import { cn } from "@/lib/utils";
import { Eraser, Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function EraseAlertDialog() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const { setEtapes } = useEtapesData();

  async function eraseAction() {
    setOpen(false);
    setProcessing(true);
    await eraseAllData();

    setEtapes([]);
    setProcessing(false);
  }

  async function handleClick() {
    toast.promise(eraseAction(), {
      loading: "Effacement de toutes les données en cours...",
      success: "Toutes les données ont été effacées avec succès !",
      error: "Erreur lors de l'effacement des données.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-10 text-gray-700 bg-gray-50 hover:bg-gray-50 rounded-md px-4 hover:text-red-600 flex gap-2 items-center transition-colors ease-in-out duration-500">
        <Eraser size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer Tout?</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer toutes les données de tous les
            modules et étapes des étudiants ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={processing}
            onClick={handleClick}
            className={cn("bg-red-500", "text-white")}
            type="submit"
          >
            {!processing ? (
              "Save changes"
            ) : (
              <span className="flex gap-2 items-center transition-colors ease-in-out duration-500">
                <Loader
                  className={"w-4 h-4 text-white animate-spin"}
                  size={20}
                />
                Supprimer tout
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
