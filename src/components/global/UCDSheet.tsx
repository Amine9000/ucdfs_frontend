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
import { EtapeDataType } from "@/types/EtapeDataType";
import { setStateType } from "@/types/setState";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { DataRecord } from "@/types/DataRecord";

interface UCDSheetProps extends HTMLAttributes<HTMLDivElement> {
  data: DataRecord | EtapeDataType;
  callback: (
    value: string,
    data?: DataRecord,
    setError?: setStateType<string>
  ) => Promise<void> | Promise<unknown> | void | null;
}

export function UCDSheet({ children, data, callback }: UCDSheetProps) {
  const [dataState, setDataState] = useState<DataRecord>(data as DataRecord);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function handleInputChange(e: { target: { name: string; value: string } }) {
    setDataState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
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
          {Object.keys(data).map((key) => {
            return (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {key}
                </Label>
                <Input
                  id="name"
                  name={key}
                  onChange={handleInputChange}
                  value={dataState[key]}
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
                  ((data as DataRecord)["CNE"] as string) ||
                    ((data as DataRecord)["code"] as string),
                  dataState,
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
  );
}
