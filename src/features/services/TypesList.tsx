import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface TypesListProps {
  handleTypeSelection: (type: string) => void;
}

const types = [
  { value: "textarea", label: "Texte à plusieurs lignes" },
  { value: "text", label: "Texte à une ligne" },
  { value: "number", label: "Nombre" },
  { value: "date", label: "Date" },
  { value: "boolean", label: "Oui/Non" },
];

export function TypesList({ handleTypeSelection }: TypesListProps) {
  const [selectedType, setSelectedType] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTypeClick = (type: { value: string; label: string }) => {
    setSelectedType(type);
    handleTypeSelection(type.value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative h-10 w-full bg-slate-50 rounded">
      <div
        onClick={toggleDropdown}
        className="w-auto h-full flex items-center justify-between gap-4 pl-4 rounded focus:ring-0 focus:ring-offset-0 border-none cursor-pointer"
      >
        <div className="text-slate-500 text-sm">
          {selectedType ? selectedType.label : "Sélectionner un type"}
        </div>
        <div className="h-full w-auto px-4 flex items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-300 rounded-r">
          <ChevronDown
            className={cn(
              "text-slate-700 transition-all duration-500",
              isDropdownOpen ? "rotate-180" : ""
            )}
            size={20}
          />
        </div>
      </div>
      <div
        className={`absolute transition-[max-height] duration-300 ease-in-out w-full overflow-hidden rounded bg-white top-11 z-10 ${
          isDropdownOpen ? "max-h-72" : "max-h-0"
        }`}
      >
        <div className="w-full h-auto border border-slate-200 p-4">
          <div className="flex flex-col gap-1">
            <div className="text-slate-500 mb-4">types</div>
            <div className="flex flex-col">
              {types.map((type) => (
                <div
                  key={type.value}
                  onClick={() => handleTypeClick(type)}
                  className="h-10 w-full hover:bg-slate-100 text-slate-800 rounded flex items-center px-4 transition-all duration-300 cursor-pointer"
                >
                  {type.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
