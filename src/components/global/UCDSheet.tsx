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
import { FileColumnNames } from "@/types/FileColumnNames";
import { HTMLAttributes, useState } from "react";
import { ValidationDialog } from "../validationList/FileData/ValidationDialog";
import { FileDataItem } from "@/types/FileDataItem";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  student: FileColumnNames | FileDataItem;
}

export function UCDSheet({ children, student }: UCDSheetProps) {
  const [stdData, setStdData] = useState<FileColumnNames>(
    student as FileColumnNames
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  function handleInputChange(e: { target: { name: string; value: string } }) {
    setStdData((prevStdData) => ({
      ...prevStdData,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update</SheetTitle>
            <SheetDescription>
              Make changes to this student data here. Click save when you're
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {Object.keys(stdData).map((key) => {
              return (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {key}
                  </Label>
                  <Input
                    id="name"
                    name={key}
                    onChange={handleInputChange}
                    value={stdData[key]}
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
              <Button type="submit" variant={"default"}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <ValidationDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
