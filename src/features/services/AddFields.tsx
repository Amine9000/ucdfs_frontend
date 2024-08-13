import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TypesList } from "./TypesList";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { dataTypeColors, typesColors } from "@/constants/typesColors";
import { FieldsType } from "@/types/FieldsType";
import { cn } from "@/lib/utils";

interface AddFieldsProps {
  handleAddTypeClick: (
    fieldName: string,
    fieldType: string,
    required: boolean,
    min: number | undefined,
    max: number | undefined
  ) => Promise<void>;
  handleDeleteClick: (fieldName: string) => void;
  error: string;
  fields?: FieldsType[];
  shape: "col" | "row";
}

export function AddFields({
  handleAddTypeClick,
  handleDeleteClick,
  error,
  fields,
  shape,
}: AddFieldsProps) {
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldType, setFieldType] = useState<string>("");
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const [required, setRequired] = useState<boolean>(true);

  function handleClick() {
    handleAddTypeClick(fieldName, fieldType, required, min, max).then(() => {
      if (error.length == 0) {
        setFieldName("");
        setFieldType("");
        setMin(undefined);
        setMax(undefined);
        setRequired(true);
      }
    });
  }

  return (
    <>
      <div
        className={cn(
          "flex items-start gap-4 w-full ",
          shape == "col" && "flex-col"
        )}
      >
        <Label
          htmlFor="name"
          className={"text-right col-span-1 " + shape == "col" ? "mb-4" : ""}
        >
          Données nécessaires
        </Label>
        <div className="flex flex-col gap-2 w-full">
          <div
            className={cn(
              "flex gap-2 justify-start w-full",
              shape == "col" ? "flex-col items-start" : "items-center"
            )}
          >
            <Input
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className={cn(
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                shape == "col" ? "w-full" : "w-1/2"
              )}
              placeholder={"Saisir le nom du field."}
            />
            <TypesList handleSemesterSelection={(type) => setFieldType(type)} />
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
            onClick={handleClick}
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
          {fields?.map((field) => {
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
                onClick={() => handleDeleteClick(field.name)}
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
    </>
  );
}
