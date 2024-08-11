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
import { HTMLAttributes, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Demande } from "@/types/Demande";

interface DemandeDialogProps extends HTMLAttributes<HTMLDivElement> {
  demande?: Demande;
}

export function DemandeDialog({ children, demande }: DemandeDialogProps) {
  const [open, setOpen] = useState<boolean>();
  const [data, setData] = useState(
    demande?.fields?.map((fields) => ({
      ...fields,
      value:
        fields.type == "number" ? 0 : fields.type == "string" ? "" : new Date(),
    }))
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{demande?.name}</DialogTitle>
          <DialogDescription>{demande?.description}</DialogDescription>
        </DialogHeader>
        {data && data.length > 0 && (
          <div className="grid gap-4 py-4">
            {data.map((d, i) => {
              return (
                <div key={i} className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="name" className="text-right col-span-1">
                    {d.name}
                  </Label>
                  <Input
                    {...d}
                    value={d.value as string}
                    onChange={(e) => {
                      setData(
                        data.map((dt) => {
                          if (dt.name == d.name)
                            return { ...d, value: e.target.value };
                          return dt;
                        })
                      );
                    }}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
                    placeholder={"Enter " + d.name}
                  />
                </div>
              );
            })}
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setOpen(false)} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
