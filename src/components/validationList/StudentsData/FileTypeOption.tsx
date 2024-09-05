import { Icons } from "@/components/icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { setStateType } from "@/types/setState";
import { useEffect, useState } from "react";

type FileTypeOptionProps = {
  onOptionChange: setStateType<string>;
};

export function FileTypeOption({ onOptionChange }: FileTypeOptionProps) {
  const [option, setOption] = useState<string>("excel");
  useEffect(() => {
    onOptionChange(option);
  }, [option]);
  return (
    <ToggleGroup type="single" defaultValue="excel" className="w-full h-10">
      <ToggleGroupItem
        onClick={() => {
          setOption("pdf");
        }}
        value="pdf"
        aria-label="Toggle bold"
        className="h-full w-1/2 flex gap-2 font-medium text-gray-600 data-[state=on]:text-red-800 data-[state=on]:bg-red-50"
      >
        <Icons.pdf
          className={cn(
            "h-6 w-6",
            option == "pdf" ? "fill-red-600" : "fill-gray-500"
          )}
        />
        PDF
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => {
          setOption("excel");
        }}
        value="excel"
        aria-label="Toggle underline"
        className="h-full w-1/2 flex gap-2 text-gray-600 data-[state=on]:text-green-500 data-[state=on]:bg-green-50 font-medium"
      >
        <Icons.excel
          className={cn(
            "h-6 w-6",
            option == "excel" ? "fill-green-600" : "fill-gray-500"
          )}
        />
        Excel
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
