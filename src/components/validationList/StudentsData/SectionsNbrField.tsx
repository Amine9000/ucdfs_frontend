import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { setStateType } from "@/types/setState";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export function SectionsNbrField({
  onOptionChange,
}: {
  onOptionChange: setStateType<number>;
}) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [sectionsNbr, setSectionsNbr] = useState<number>(1);

  useEffect(() => {
    if (sectionsNbr > 0) {
      onOptionChange(sectionsNbr);
    }
  }, [sectionsNbr]);
  useEffect(() => {
    if (clicked) setSectionsNbr(1);
  }, [clicked]);
  return (
    <div className="w-full h-full grid grid-cols-4 gap-2">
      <div className="col-span-1 h-10 flex items-center justify-end">
        {!clicked && (
          <div
            onClick={() => setClicked(!clicked)}
            className={cn(
              "h-6 w-6 rounded flex items-center justify-center cursor-pointer border",
              clicked ? "bg-sky-500 text-white" : "bg-gray-50 border-gray-100"
            )}
          >
            <Check size={20} className="text-gray-500" />
          </div>
        )}
        {clicked && (
          <Label htmlFor="secions-num" className="uppercase">
            N.Sections
          </Label>
        )}
      </div>
      <div className="col-span-3 h-full">
        {!clicked && (
          <div className="w-full h-full flex flex-col items-start text-sm justify-center text-gray-500 rounded">
            Sections? (optional)
          </div>
        )}
        {clicked && (
          <div>
            <Input
              id="secions-num"
              type="text"
              value={sectionsNbr == 0 ? "" : sectionsNbr}
              onBlur={(e) => {
                if (e.target.value == "") {
                  setSectionsNbr(0);
                  setClicked(false);
                }
              }}
              onChange={(e) => {
                if (/[0-9]/.test(e.target.value))
                  setSectionsNbr(parseInt(e.target.value));
                else setSectionsNbr(0);
              }}
              placeholder={"Saisir le nombre de sections"}
              className={
                "col-span-3 h-10 p-2 rounded focus-visible:ring-0 focus-visible:ring-offset-0"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
