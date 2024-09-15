import { Button } from "@/components/ui/button";
import { options, SettingsOption } from "@/constants/settingsOptions";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useState } from "react";

export function Paramerters() {
  const [history, setHistory] = useState<
    { level: number; options: SettingsOption[] }[]
  >([{ level: 0, options }]);
  const [step, setStep] = useState<
    null | "slideLeft" | "hidden" | "slideRight"
  >(null);

  const handleOptionClick = (option: SettingsOption) => {
    const newHistory = [
      ...history,
      { level: history.length, options: option.children || [] },
    ];
    setHistory(newHistory);
    setStep("slideLeft");
    setTimeout(() => {
      setStep("slideRight");
      setTimeout(() => setStep(null), 500);
    }, 200);
  };

  const handleGoBack = () => {
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
  };

  const currentLevel = history[history.length - 1];

  return (
    <div className="w-full relative overflow-hidden h-full bg-gray-100 flex flex-col items-center">
      <ParametersNavbar handleGoBack={handleGoBack} history={history} />
      <div
        className={cn(
          `w-1/2 h-full transition-transform duration-500 ease-in-out`,
          {
            "animate-slideLeft": step === "slideLeft",
            hidden: step === "hidden",
            "animate-slideRight": step === "slideRight",
          }
        )}
      >
        {currentLevel.options ? (
          <Options
            options={currentLevel.options}
            onOptionClick={handleOptionClick}
          />
        ) : (
          <div>No Options Available</div>
        )}
      </div>
    </div>
  );
}

interface ParametersNavBarProps {
  history: { level: number; options: SettingsOption[] }[];
  handleGoBack: () => void;
}

const ParametersNavbar: React.FC<ParametersNavBarProps> = ({
  history,
  handleGoBack,
}) => {
  return (
    <div className="h-12 px-4 py-1 w-full bg-white rounded ">
      {history.length > 1 && (
        <Button
          className="bg-gray-50 hover:bg-gray-50 text-gray-600"
          onClick={handleGoBack}
        >
          <ChevronLeft size={20} />
        </Button>
      )}
    </div>
  );
};

interface OptionsProps {
  options: SettingsOption[];
  onOptionClick: (option: SettingsOption) => void;
}

const Options: React.FC<OptionsProps> = ({ options, onOptionClick }) => {
  return (
    <div className="p-4">
      {options.map((option, index) => {
        if (option.component)
          return (
            <option.component key={index}>
              <div
                className="mb-1 cursor-pointer p-4 bg-white shadow rounded hover:bg-gray-50"
                onClick={() => (option.children ? onOptionClick(option) : null)}
              >
                <div className="flex items-center justify-start gap-2">
                  <div className="h-12 w-12 rounded text-gray-500 bg-gray-50 flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div className="h-12 flex flex-col items-start justify-center">
                    <h3 className="font-semibold">{option.label}</h3>
                    <small className="text-gray-600 text-sm">
                      {option.desc}
                    </small>
                  </div>
                </div>
              </div>
            </option.component>
          );
        return (
          <div
            key={index}
            className="mb-1 cursor-pointer p-4 bg-white shadow rounded hover:bg-gray-50"
            onClick={() => (option.children ? onOptionClick(option) : null)}
          >
            <div className="flex items-center justify-start gap-2">
              <div className="h-12 w-12 rounded text-gray-500 bg-gray-50 flex items-center justify-center">
                {option.icon}
              </div>
              <div className="h-12 flex flex-col items-start justify-center">
                <h3 className="font-semibold">{option.label}</h3>
                <small className="text-gray-600 text-sm">{option.desc}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
