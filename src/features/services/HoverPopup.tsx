import { dataTypeColors, typesColors } from "@/constants/typesColors";
import { cn } from "@/lib/utils";
import { Demande } from "@/types/Demande";
import { ReactNode, useState } from "react";

interface HoverPopupProps {
  trigger: ReactNode;
  demande: Demande;
}

// <h1 style={{ background: "#abbcf1", width: "200px" }}> Hover on me </h1>
// <h1> I am hover HTML </h1>

export function HoverPopup({ trigger, demande }: HoverPopupProps) {
  const [hide, setHide] = useState<boolean>(true);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  function handleMouseEnter() {
    setHide(false);
  }

  function handleMouseLeave() {
    setHide(true);
  }
  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left + 20,
      y: event.clientY - rect.top + 20,
    });
  }

  return (
    <div className="w-full h-full relative">
      <div
        className="w-full h-full p-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={(e) => handleMouseMove(e)}
      >
        {trigger}
      </div>
      <div
        style={{
          left: position.x + "px",
          top: position.y + "px",
        }}
        className={cn(
          "absolute flex flex-col gap-2 z-50 min-w-full w-[500px] px-4 bg-white border text-gray-800 rounded-md shadow-md transition-all duration-300 py-4",
          hide && "hidden"
        )}
      >
        <h3 className="text-slate-800">{demande.name}</h3>
        <small className="text-gray-600">{demande.description}</small>
        <div className="flex flex-wrap gap-2">
          {demande.fields?.map((field) => {
            const colors = dataTypeColors[field.type as typesColors] || {
              bg: "",
              text: "",
            };
            return (
              <div
                key={field.name}
                className={
                  "text-sm py-1 px-2 rounded flex gap-1 " +
                  colors.bg +
                  " " +
                  colors.text
                }
              >
                <small> {field.name}</small>
                <small className="text-gray-700"> {field.type}</small>
                {field.min && <small> {field.min}</small>}
                {field.max && <small> {field.max}</small>}
                {field.required && <small> {field.required}</small>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
