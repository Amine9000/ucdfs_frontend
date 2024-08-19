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
import { FieldsType } from "@/types/FieldsType";
import { FieldValue, ServiceRequestType } from "@/types/serviceRequestDataType";
import { addStdServicerequest } from "@/lib/axios/serviceRequests/addServiceRequest";

interface DemandeDialogProps extends HTMLAttributes<HTMLDivElement> {
  demande?: Demande;
}

export function DemandeDialog({ children, demande }: DemandeDialogProps) {
  const [open, setOpen] = useState<boolean>();
  const [data, setData] = useState(demande?.fields);

  function handleSaveClick() {
    let filedsValues: FieldValue[] = [];
    if (data) {
      filedsValues = data?.map((field) => {
        return {
          field_id: field.id,
          value: (field.value as string) ?? "",
        };
      });
    }
    const servicerequest: ServiceRequestType = {
      service_id: "",
      fieldsValues: filedsValues,
    };
    if (demande && demande.id) servicerequest.service_id = demande.id;
    console.log(servicerequest);
    addStdServicerequest(servicerequest);
    setOpen(false);
  }

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
            {data.map((d: FieldsType, i: number) => {
              return (
                <div key={i} className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="name" className="text-right col-span-1">
                    {d.name}
                  </Label>
                  {d.type == "number" && (
                    <Input
                      className="col-span-6"
                      placeholder={"Enter " + d.name}
                      min={d.min !== undefined ? d.min : 0}
                      max={d.max !== undefined ? d.max : 0}
                      type="number"
                      id={d.name}
                      name={d.name}
                      value={
                        d.value !== undefined
                          ? (d.value as number)
                          : d.min !== undefined
                          ? d.min
                          : 0
                      }
                      required={d.required !== undefined ? d.required : true}
                      onChange={(e) =>
                        setData((prev) => {
                          if (!prev) return prev;
                          const newData = [...prev];
                          newData[i].value = Number(e.target.value);
                          return newData;
                        })
                      }
                    />
                  )}
                  {d.type == "string" && (
                    <Input
                      className="col-span-6"
                      placeholder={"Enter " + d.name}
                      type="text"
                      id={d.name}
                      name={d.name}
                      value={d.value !== undefined ? (d.value as string) : ""}
                      required={d.required !== undefined ? d.required : true}
                      onChange={(e) =>
                        setData((prev) => {
                          if (!prev) return prev;
                          const newData = [...prev];
                          newData[i].value = e.target.value;
                          return newData;
                        })
                      }
                    />
                  )}
                  {d.type == "date" && (
                    <Input
                      className="col-span-6"
                      placeholder={"Enter " + d.name}
                      type="date"
                      id={d.name}
                      name={d.name}
                      value={d.value !== undefined ? (d.value as string) : ""}
                      required={d.required !== undefined ? d.required : true}
                      onChange={(e) =>
                        setData((prev) => {
                          if (!prev) return prev;
                          const newData = [...prev];
                          newData[i].value = e.target.value;
                          return newData;
                        })
                      }
                    />
                  )}
                  {d.type == "boolean" && (
                    <Input
                      className="col-span-6"
                      type="checkbox"
                      id={d.name}
                      name={d.name}
                      checked={
                        d.value !== undefined
                          ? (d.value as unknown as boolean)
                          : true
                      }
                      onChange={(e) =>
                        setData((prev) => {
                          if (!prev) return prev;
                          const newData = [...prev];
                          newData[i].value = e.target.checked;
                          return newData;
                        })
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleSaveClick} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
