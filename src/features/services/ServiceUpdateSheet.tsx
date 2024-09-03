import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HTMLAttributes, useState } from "react";
import { AlertCircle, BadgeInfo } from "lucide-react";
import { Demande } from "@/types/Demande";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { updateService } from "@/lib/axios/services/updateService";
import { useServices } from "@/hooks/useServices";
import { AddFields } from "./AddFields";
import { FieldType, FieldsType } from "@/types/FieldsType";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  data: Demande;
}

export function ServiceUpdateSheet({ children, data }: UCDSheetProps) {
  const { setServices } = useServices();
  const [dataState, setDataState] = useState<Demande>(data);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");

  function handleInputChange(e: { target: { name: string; value: string } }) {
    setDataState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleDeleteClick(fieldName: string) {
    const nFields = dataState.fields?.filter(
      (field) => field.name != fieldName
    );
    setDataState({ ...dataState, fields: nFields });
  }

  async function handleUpdateClick() {
    if (dataState.id) {
      const res = await updateService(dataState.id, {
        ...dataState,
        fields: dataState.fields?.map((field) => {
          delete field.id;
          return field;
        }),
      });
      if (res)
        if (res.status === 200) {
          setServices((prevServices) => {
            const index = prevServices.findIndex(
              (service) => service.id === dataState.id
            );
            if (index !== -1) {
              prevServices[index] = dataState;
            }
            return [...prevServices];
          });
          setOpen(false);
        } else {
          setError(res.data.message);
        }
    }
  }

  async function handleAddTypeClick(
    fieldName: string,
    fieldType: string,
    required: boolean,
    min: number | undefined,
    max: number | undefined
  ) {
    setFieldError("");
    const newField: FieldsType = {
      name: fieldName,
      type: fieldType as FieldType,
      required,
    };
    if (fieldName == "") {
      setFieldError("Field name is require");
    } else if (fieldType == "") {
      setFieldError("Field type is require");
    } else {
      const existedFileds = dataState.fields?.filter(
        (field) => field.name == fieldName
      );
      if (existedFileds && existedFileds?.length > 0) {
        setFieldError("A field with the same name already exists.");
      } else {
        if (min) newField.min = min;
        if (max) newField.max = max;
        setDataState({
          ...dataState,
          fields: [...(dataState.fields ?? []), newField as FieldsType],
        });
      }
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update</SheetTitle>
          <SheetDescription>
            Make changes to this student data here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {error && error.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 py-4">
          <div className="py-2 text-slate-400 mb-4 text-sm flex gap-2 justify-start items-center">
            <BadgeInfo size={20} />
            <span>cliquez sur les champs pour les supprimer</span>
          </div>
          {Object.keys(data).map((key) => {
            if (key != "id")
              if (dataState && key == "fields") {
                return (
                  <AddFields
                    handleDeleteClick={handleDeleteClick}
                    key={key}
                    shape={"col"}
                    handleAddTypeClick={handleAddTypeClick}
                    error={fieldError}
                    fields={dataState.fields}
                  />
                );
              } else
                return (
                  <div
                    key={key}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label htmlFor="name" className="text-right">
                      {key}
                    </Label>
                    <Input
                      id="name"
                      name={key}
                      onChange={handleInputChange}
                      value={
                        key == "name" ? dataState.name : dataState.description
                      }
                      className="col-span-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                );
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              onClick={handleUpdateClick}
              type="submit"
              variant={"default"}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
