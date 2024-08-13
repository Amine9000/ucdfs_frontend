import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HTMLAttributes, useState } from "react";
import { Option } from "@/types/Option";
import { AlertMessageType } from "@/types/AlertMessage";
import { Demande } from "@/types/Demande";
import { Label } from "@/components/ui/label";
import { UCDAlertDialog } from "@/components/global/Dialog";
import { ServiceUpdateSheet } from "./ServiceUpdateSheet";
import { dataTypeColors, typesColors } from "@/constants/typesColors";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  data: Demande;
  options: Option[];
}

const deleteMessage: AlertMessageType = {
  title: "Delete Element",
  description: "Are you sure you want to delete this element.",
  type: "error",
};

export function ServiceSheet({ children, options, data }: UCDSheetProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Options</SheetTitle>
          <SheetDescription>
            Modifiez ces données comme vous le souhaitez. Cliquez sur
            enregistrer lorsque vous avez terminé.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 my-2">
          {Object.entries(data).map(([key, value], i) => {
            if (key != "id")
              if (key == "fields") {
                return data.fields?.map((field) => {
                  const colors = dataTypeColors[field.type as typesColors] || {
                    bg: "",
                    text: "",
                  };
                  return (
                    <div
                      key={field.name}
                      className={
                        "text-sm p-2 rounded flex gap-1 " +
                        colors.bg +
                        " " +
                        colors.text
                      }
                    >
                      <span> {field.name}</span>
                      <span className="text-gray-700"> {field.type}</span>
                      {field.min && <span> {field.min}</span>}
                      {field.max && <span> {field.max}</span>}
                      {field.required && <span> {field.required}</span>}
                    </div>
                  );
                });
              } else
                return (
                  <div key={i} className="w-full rounded py-4 px-4 flex gap-4">
                    <Label
                      htmlFor="name"
                      className="w-1/2 text-gray-900 first-letter:uppercase"
                    >
                      {key}
                    </Label>
                    <Label htmlFor="name" className="w-1/2 text-gray-600">
                      {value}
                    </Label>
                  </div>
                );
          })}
        </div>
        <SheetFooter>
          <div className="flex flex-col gap-2 w-full mt-8">
            {options.map((option) => {
              switch (option.value) {
                case "delete":
                  return (
                    <UCDAlertDialog
                      key={option.label}
                      message={deleteMessage}
                      confirmAction={() => console.log("Deleted")}
                    >
                      <div className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start">
                        <option.icon size={20} />
                        {option.label}
                      </div>
                    </UCDAlertDialog>
                  );
                default:
                  return (
                    <ServiceUpdateSheet
                      key={option.label}
                      data={data}
                      callback={() => console.log("Updated")}
                    >
                      <div className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start">
                        <option.icon size={20} />
                        {option.label}
                      </div>
                    </ServiceUpdateSheet>
                  );
              }
            })}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
