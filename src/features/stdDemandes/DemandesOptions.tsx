import { ListChecks, ListPlus } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

interface DemandesOptionsProps {
  onChange: (option: string) => void;
}

export function DemandesOptions({ onChange }: DemandesOptionsProps) {
  const [option, setOption] = useState<string>("all");

  useEffect(() => {
    onChange(option);
  }, [option]);

  return (
    <ToggleGroup
      defaultValue="list"
      type="single"
      onValueChange={(value) => setOption(value)}
    >
      <ToggleGroupItem
        value="list"
        className="flex items-center gap-2 font-normal data-[state=on]:text-blue-500 data-[state=off]:text-gray-500 data-[state=on]:bg-blue-50 data-[state=off]:bg-gray-50"
      >
        <ListPlus size={20} /> Tous
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sent"
        className="flex items-center gap-2 font-normal data-[state=on]:text-green-500 data-[state=off]:text-gray-500 data-[state=on]:bg-green-50 data-[state=off]:bg-gray-50"
      >
        <ListChecks size={20} /> Envoyé
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
