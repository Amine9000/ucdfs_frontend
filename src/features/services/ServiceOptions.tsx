import { ListChecks, ListPlus } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

interface DemandesOptionsProps {
  onChange: (option: "services" | "demandes") => void;
}

export function ServiceOptions({ onChange }: DemandesOptionsProps) {
  const [option, setOption] = useState<string>("services");

  useEffect(() => {
    onChange(option as "services" | "demandes");
  }, [option]);

  return (
    <ToggleGroup
      defaultValue="services"
      type="single"
      onValueChange={(value) => setOption(value)}
    >
      <ToggleGroupItem
        value="services"
        className="flex items-center gap-2 font-normal data-[state=on]:text-blue-500 data-[state=off]:text-gray-500 data-[state=on]:bg-blue-50 data-[state=off]:bg-gray-50"
      >
        <ListPlus size={20} /> Services
      </ToggleGroupItem>
      <ToggleGroupItem
        value="demandes"
        className="flex items-center gap-2 font-normal data-[state=on]:text-green-500 data-[state=off]:text-gray-500 data-[state=on]:bg-green-50 data-[state=off]:bg-gray-50"
      >
        <ListChecks size={20} /> Demandes
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
