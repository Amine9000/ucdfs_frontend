import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Demandes } from "./Demandes";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { useState } from "react";
import { DemandeInfo } from "./DemandeInfo";

export function ResizableDemande() {
  const [selectedDemande, setSelectedDemande] = useState<
    DemandeRequestType | undefined
  >();
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center justify-center p-2">
          {<Demandes setSelectedDemande={setSelectedDemande} />}
        </div>
      </ResizablePanel>
      {selectedDemande && <ResizableHandle />}
      {selectedDemande && (
        <ResizablePanel defaultSize={50} maxSize={500}>
          <DemandeInfo
            selectedDemande={selectedDemande}
            setSelectedDemande={setSelectedDemande}
          />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  );
}
