import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setStateType } from "@/types/setState";
import { Flower, LeafyGreen } from "lucide-react";

type FileTypeOptionProps = {
  setSession: setStateType<"printemps" | "automne">;
};

export function Session({ setSession }: FileTypeOptionProps) {
  return (
    <ToggleGroup type="single" defaultValue="printemps" className="w-full h-10">
      <ToggleGroupItem
        onClick={() => {
          setSession("automne");
        }}
        value="automne"
        aria-label="Toggle bold"
        className="h-full w-1/2 flex gap-2 font-medium text-gray-600 data-[state=on]:text-yellow-800 data-[state=on]:bg-yellow-50"
      >
        <LeafyGreen size={20} />
        Automne
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={() => {
          setSession("printemps");
        }}
        value="printemps"
        aria-label="Toggle underline"
        className="h-full w-1/2 flex gap-2 text-gray-600 data-[state=on]:text-green-700 data-[state=on]:bg-green-50 font-medium"
      >
        <Flower size={20} />
        Printemps
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
