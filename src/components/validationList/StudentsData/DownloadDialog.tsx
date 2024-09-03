import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStudentsData } from "@/hooks/useStudentsData";
import { getProccessedDataFile } from "@/lib/axios/students/getProccessedDataFile";
import { setStateType } from "@/types/setState";
import { useState } from "react";
import toast from "react-hot-toast";

type DownloadDialogProps = {
  open: boolean;
  onOpenChane: setStateType<boolean>;
};

export function DownloadDialog({ open, onOpenChane }: DownloadDialogProps) {
  const { semester, setSemester } = useStudentsData();
  const [groupNum, setGroupNum] = useState<number | string>(1);

  async function handleSubmit() {
    await getProccessedDataFile(semester.code, groupNum as number);
    onOpenChane(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChane}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download Data</DialogTitle>
          <DialogDescription>
            Enter these infos about so we can prepare your file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code-etape" className="text-right">
              CODE ETAPE
            </Label>
            <Input
              id="code-etape"
              value={semester.code}
              onChange={(e) =>
                e && setSemester({ ...semester, code: e.target.value })
              }
              className="col-span-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groups-num" className="text-right">
              N.GROUPS
            </Label>
            <Input
              id="groups-num"
              min={1}
              value={groupNum ?? 1}
              onChange={(e) => {
                if (e) {
                  const value = parseInt(e.target.value);
                  setGroupNum(isNaN(value) ? "" : value);
                }
              }}
              type="number"
              className="col-span-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              toast.promise(handleSubmit(), {
                loading: "Downloading your file ...",
                success: (
                  <p className="text-teal-600">
                    votre fichier a été téléchargé avec succès.
                  </p>
                ),
                error: (
                  <p className="text-red-500">Could not download your file.</p>
                ),
              });
            }}
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
