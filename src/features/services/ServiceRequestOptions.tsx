import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status, statusColors } from "@/types/Demande";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { HTMLAttributes, useState } from "react";

interface ServiceRequestOptionsProps extends HTMLAttributes<HTMLDivElement> {
  serviceRequest: DemandeRequestType;
}

export function ServiceRequestOptions({
  children,
  serviceRequest,
}: ServiceRequestOptionsProps) {
  const [position, setPosition] = useState(
    serviceRequest.state == "in Progress" ? "inProgress" : serviceRequest.state
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>demande State</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            className={
              statusColors[Status.InProgress].text +
              " focus:" +
              statusColors[Status.InProgress].text
            }
            value="inProgress"
          >
            In Progress
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className={
              statusColors[Status.Pending].text +
              " focus:" +
              statusColors[Status.Pending].text
            }
            value="pending"
          >
            Pending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className={
              statusColors[Status.Rejected].text +
              " focus:" +
              statusColors[Status.Rejected].text
            }
            value="rejected"
          >
            Rejected
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className={
              statusColors[Status.Approved].text +
              " focus:" +
              statusColors[Status.Approved].text
            }
            value="approved"
          >
            Approved
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
