import { EtapeList } from "./EtapeList";
import { EtapeListNavbar } from "./EtapeListNavbar";

export function EtapeListScreen() {
  return (
    <div className="w-full h-full flex-grow flex-shrink-0 flex flex-col items-center justify-start gap-2">
      <EtapeListNavbar />
      <EtapeList />
    </div>
  );
}
