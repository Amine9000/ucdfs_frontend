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
import { TypesList } from "./TypesList";
import { Switch } from "@/components/ui/switch";
import { FieldType, FieldsType } from "@/types/FieldsType";
import { dataTypeColors, typesColors } from "@/constants/typesColors";
import { addService } from "@/lib/axios/services/addService";
import toast from "react-hot-toast";
import { useServices } from "@/hooks/useServices";

interface AddDemandeDialogProps extends HTMLAttributes<HTMLDivElement> {}

export function AddDemandeDialog({ children }: AddDemandeDialogProps) {
  const { services, setServices } = useServices();
  const [open, setOpen] = useState<boolean>();
  const [error, setError] = useState<string>("");
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldType, setFieldType] = useState<string>("");
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const [required, setRequired] = useState<boolean>(true);
  const [service, setService] = useState<Demande>({
    name: "",
    description: "",
    fields: [],
  });

  async function handleAddTypeClick() {
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
        setServices([...services, service]);
        setFieldName("");
        setFieldType("");
        setMin(undefined);
        setMax(undefined);
        setRequired(true);
      }
    }
  }

  async function postService() {
    const responce = await addService(service);
    if (responce?.status == 201) {
      toast.success(`new Service created`);
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
          <div className="flex items-start gap-4 w-full">
            <Label
              htmlFor="name"
              className="text-right col-span-1 text-gray-700"
            >
              Données nécessaires
            </Label>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 justify-start w-full">
                <Input
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 w-1/2"
                  placeholder={"Saisir le nom du field."}
                />
                <TypesList
                  handleSemesterSelection={(type) => setFieldType(type)}
                />
              </div>
              {fieldType == "number" && (
                <div className="flex items-center gap-2 justify-start w-full">
                  <Input
                    value={min ? min : "--"}
                    onChange={(e) => setMin(parseInt(e.target.value) || 1)}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 w-1/2"
                    placeholder={"Saisir le min du field."}
                  />
                  <Input
                    value={max ? max : "--"}
                    onChange={(e) => setMax(parseInt(e.target.value) || 1)}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 w-1/2"
                    placeholder={"Saisir le max du field."}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 justify-start w-full py-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={required}
                    id="airplane-mode"
                    onCheckedChange={(isRequired) => setRequired(isRequired)}
                    className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-input"
                  />
                  <Label
                    htmlFor="airplane-mode"
                    className="text-slate-800 text-sm font-normal"
                  >
                    required
                  </Label>
                </div>
              </div>
              <Button
                onClick={handleAddTypeClick}
                className="bg-blue-500 hover:bg-blue-500 w-auto text-white"
              >
                Ajouter
              </Button>
              {error != "" && (
                <div className="h-auto text-sm w-full border border-red-100 text-red-500 bg-red-50 rounded py-2 px-4">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="max-h-40 overflow-auto items-center gap-4">
            <div className="w-full h-auto flex flex-wrap gap-2">
              {service.fields?.map((field) => {
                const colors = dataTypeColors[field.type as typesColors] || {
                  bg: "",
                  text: "",
                };
                return (
                  <div
                    key={field.name}
                    className={
                      "text-sm py-1 px-2 rounded flex gap-1 " +
                      colors.bg +
                      " " +
                      colors.text
                    }
                  >
                    <small> {field.name}</small>
                    <small className="text-gray-700"> {field.type}</small>
                    {field.min && (
                      <small className="text-gray-500">
                        {" "}
                        Min <span className={colors.text}>{field.min}</span>
                      </small>
                    )}
                    {field.max && (
                      <small className="text-gray-500">
                        {" "}
                        Max <span className={colors.text}>{field.max}</span>
                      </small>
                    )}
                    {field.required && <small> {field.required}</small>}
                  </div>
                );
              })}
            </div>
          </div>
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
