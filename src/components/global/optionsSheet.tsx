import { Button } from "@/components/ui/button";
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
import { ValidationDialog } from "../validationList/FileData/ValidationDialog";
import { Option } from "@/types/Option";
import { FileDataItem } from "@/types/FileDataItem";
import { Label } from "../ui/label";
import { UCDSheet } from "./UCDSheet";
import { Settings2, Trash2 } from "lucide-react";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  data: FileDataItem;
  options: Option[];
}

export function OptionsSheet({ children, options, data }: UCDSheetProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Options</SheetTitle>
            <SheetDescription>
              Make changes to this etape data here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 my-2">
            {Object.entries(data).map(([key, value], i) => {
              return (
                <div key={i} className="w-full rounded py-4 px-4 flex gap-4">
                  <Label htmlFor="name" className="w-1/2 text-gray-900">
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
            <div className="flex flex-col gap-2 w-full">
              {options.map((option) => {
                // return <div key={option.label}>{option.label}</div>;
                switch (option.value) {
                  case "delete":
                    return (
                      <div
                        className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start"
                        key={option.label}
                        onClick={() => option.callback(data.code)}
                      >
                        <Trash2 />
                        {option.label}
                      </div>
                    );
                  default:
                    return (
                      <UCDSheet student={data}>
                        <div
                          className="flex gap-4 text-slate-700 bg-slate-100 w-full rounded-sm py-2 px-4 cursor-pointer items-center justify-start"
                          key={option.label}
                          onClick={() => option.callback(data.code)}
                        >
                          <Settings2 size={20} />
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
      <ValidationDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
