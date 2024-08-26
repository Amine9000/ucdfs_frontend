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
import { EtapeDataType } from "@/types/EtapeDataType";
import { Label } from "../ui/label";
import { UCDSheet } from "./UCDSheet";
import { UCDAlertDialog } from "./Dialog";
import { AlertMessageType } from "@/types/AlertMessage";
import { DataRecord } from "@/types/DataRecord";
import { HOST_LINK } from "@/constants/host";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  data: EtapeDataType | DataRecord;
  options: Option[];
}

const deleteMessage: AlertMessageType = {
  title: "Delete Element",
  description: "Are you sure you want to delete this element.",
  type: "error",
};

export function OptionsSheet({ children, options, data }: UCDSheetProps) {
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
            if (key == "id") return null;
            if (key == "avatar")
              return (
                <div
                  key={i}
                  className="w-full rounded py-4 px-4 flex justify-center bg-gray-50"
                >
                  <img
                    className="h-32 w-32 rounded-md"
                    src={HOST_LINK + "static/" + value}
                    alt="avatar"
                  />
                </div>
              );
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
                      confirmAction={() =>
                        option.callback(
                          ((data as DataRecord)["CNE"] as string) ||
                            ((data as DataRecord)["code"] as string)
                        )
                      }
                    >
                      <div className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start">
                        <option.icon size={20} />
                        {option.label}
                      </div>
                    </UCDAlertDialog>
                  );
                case "showstudents":
                  return (
                    <div
                      key={option.label}
                      onClick={() => option.callback(data.code as string)}
                      className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start"
                    >
                      <option.icon size={20} />
                      {option.label}
                    </div>
                  );
                case "regeneratepwd":
                  return (
                    <div
                      key={option.label}
                      onClick={() => {
                        option.callback((data as DataRecord)["Code"] as string);
                      }}
                      className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start"
                    >
                      <option.icon size={20} />
                      {option.label}
                    </div>
                  );
                default:
                  return (
                    <UCDSheet
                      key={option.label}
                      data={data}
                      callback={option.callback}
                    >
                      <div className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start">
                        <option.icon size={20} />
                        {option.label}
                      </div>
                    </UCDSheet>
                  );
              }
            })}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
