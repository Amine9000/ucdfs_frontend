import { ScreensProvider } from "@/context/Screens";
import { Screens } from "./Screens";

export function ValidationList() {
  return (
    <div className="w-full h-full flex items-start justify-center overflow-x-hidden relative">
      <ScreensProvider>
        <Screens />
      </ScreensProvider>
    </div>
  );
}
