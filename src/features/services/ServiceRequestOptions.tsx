import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServiceRequests } from "@/hooks/useServiceRequests";
import { updateState } from "@/lib/axios/serviceRequests/updateState";
import { Status, statusColors } from "@/types/Demande";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";

interface ServiceRequestOptionsProps extends HTMLAttributes<HTMLDivElement> {
  serviceRequest: DemandeRequestType;
}

export function ServiceRequestOptions({
  children,
  serviceRequest,
}: ServiceRequestOptionsProps) {
  const { setServiceRequests } = useServiceRequests();
  const [state, setState] = useState(
    serviceRequest.state == "in Progress" ? "inProgress" : serviceRequest.state
  );

  function handleStateChange(newState: string) {
    toast.promise(
      updateState(
        serviceRequest.id,
        newState == "inProgress" ? "in Progress" : newState
      ),
      {
        loading: "Updating ...",
        success: <p className="text-teal-600">State updated successfully</p>,
        error: <p className="text-red-500">Failed to update state</p>,
      }
    );
    setServiceRequests((pre) => {
      const nServicerequests = pre.map((serviceReq) => {
        if (serviceReq.id == serviceRequest.id)
          return {
            ...serviceReq,
            state:
              newState == "inProgress"
                ? ("in Progress" as Status)
                : (newState as Status),
          };
        else return serviceReq;
      });
      return nServicerequests;
    });
    setState(newState);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>demande State</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={state} onValueChange={handleStateChange}>
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
