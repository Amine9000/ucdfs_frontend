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
import { setStateType } from "@/types/setState";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  student: FileColumnNames | FileDataItem;
  callback: (
    value: string,
    data?: FileColumnNames,
    setError?: setStateType<string>
  ) => Promise<void> | Promise<unknown> | void | null;
}

export function UCDSheet({ children, student, callback }: UCDSheetProps) {
  const [stdData, setStdData] = useState<FileColumnNames>(
    student as FileColumnNames
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
          {error && error.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
              <Button
                onClick={() =>
                  callback(
                    (student as FileColumnNames)["CNE"],
                    stdData,
                    setError as setStateType<string>
                  )
                }
                type="submit"
                variant={"default"}
              >
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
