import { useScreen } from "@/hooks/useScreen";

export function Screens() {
  const { screen } = useScreen();
  return (
    <div className="w-full h-full flex items-start justify-center overflow-y-auto">
      {screen?.screen.component}
    </div>
  );
}
