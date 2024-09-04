import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setStateType } from "@/types/setState";

type FileTypeOptionProps = {
  onOptionChange: setStateType<string>;
};

export function FileTypeOption({ onOptionChange }: FileTypeOptionProps) {
  return (
    <ToggleGroup type="single" defaultValue="excel" className="w-full h-full">
      <ToggleGroupItem
        onClick={() => {
          onOptionChange("pdf");
        }}
        value="pdf"
        aria-label="Toggle bold"
        className="h-full w-1/2 flex gap-2 font-medium text-gray-600 data-[state=on]:text-red-800 data-[state=on]:bg-red-50"
      >
        PDF
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => {
          onOptionChange("excel");
        }}
        value="excel"
        aria-label="Toggle underline"
        className="h-full w-1/2 flex gap-2 text-gray-600 data-[state=on]:text-green-500 data-[state=on]:bg-green-50 font-medium"
      >
        Excel
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
