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
import { Demande } from "@/types/Demande";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldType, FieldsType } from "@/types/FieldsType";
import { addService } from "@/lib/axios/services/addService";
import toast from "react-hot-toast";
import { useServices } from "@/hooks/useServices";
import { AddFields } from "./AddFields";

interface AddDemandeDialogProps extends HTMLAttributes<HTMLDivElement> {}

export function AddServiceDialog({ children }: AddDemandeDialogProps) {
  const { services, setServices } = useServices();
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>();
  const [service, setService] = useState<Demande>({
    name: "",
    description: "",
    fields: [],
  });

  function handleDeleteClick(fieldName: string) {
    const nFields = service.fields?.filter((field) => field.name != fieldName);
    setService({ ...service, fields: nFields });
  }

  async function handleAddTypeClick(
    fieldName: string,
    fieldType: string,
    required: boolean,
    min: number | undefined,
    max: number | undefined
  ) {
    setError("");
    const newField: FieldsType = {
      name: fieldName,
      type: fieldType as FieldType,
      required,
    };
    if (fieldName == "") {
      setError("Field name is require");
    } else if (fieldType == "") {
      setError("Field type is require");
    } else {
      const existedFileds = service.fields?.filter(
        (field) => field.name == fieldName
      );
      if (existedFileds && existedFileds?.length > 0) {
        setError("A field with the same name already exists.");
      } else {
        if (min) newField.min = min;
        if (max) newField.max = max;
        setService({
          ...service,
          fields: [...(service.fields ?? []), newField as FieldsType],
        });
      }
    }
  }

  async function postService() {
    const responce = await addService(service);
    if (responce?.status == 201) {
      toast.success(`new Service created`);
      setServices([...services, service]);
      setService({
        name: "",
        description: "",
        fields: [],
      });
    } else {
      toast.error(
        `An error occured status code ${responce?.status} and status text ${responce?.statusText}`
      );
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle service.</DialogTitle>
          <DialogDescription>Ajouter une nouvelle service</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-7 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              Nom
            </Label>
            <Input
              min={1}
              value={service?.name}
              onChange={(e) => {
                setService({
                  ...service,
                  name: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Saisir le nom du service."}
            />
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              Description
            </Label>
            <Input
              min={1}
              value={service?.description}
              onChange={(e) => {
                setService({
                  ...service,
                  description: e.target.value ? e.target.value : "",
                });
              }}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 col-span-6"
              placeholder={"Saisir la description du service."}
            />
          </div>
          <AddFields
            handleDeleteClick={handleDeleteClick}
            shape="row"
            handleAddTypeClick={handleAddTypeClick}
            error={error}
            fields={service.fields}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              postService();
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
