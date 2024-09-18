import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useServiceRequests } from "@/hooks/useServiceRequests";
import { useEffect } from "react";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { statusColors } from "@/types/Demande";
import { fetchServiceRequests } from "@/lib/axios/serviceRequests/fetchServicerequests";
import { setStateType } from "@/types/setState";
import { tofrench } from "@/lib/toFrench";

type DemandesProps = {
  setSelectedDemande: setStateType<DemandeRequestType | undefined>;
};

export function Demandes({ setSelectedDemande }: DemandesProps) {
  const { serviceRequests, setServiceRequests } = useServiceRequests();

  async function fetchServicerequests() {
    const servicereqs: DemandeRequestType[] | undefined =
      await fetchServiceRequests();
    if (servicereqs) setServiceRequests(servicereqs);
  }

  useEffect(() => {
    fetchServicerequests();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-auto">
      <div className="w-full h-full flex justify-center">
        {serviceRequests.length ? (
          <Table className="mb-24">
            <TableCaption>Liste des demandes.</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-white">
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceRequests.map((serviceReq, i) => {
                return (
                  <TableRow
                    onClick={() => setSelectedDemande(serviceReq)}
                    className="hover:bg-gray-50 group"
                    key={i}
                  >
                    <TableCell className="text-gray-600">
                      {serviceReq.user.user_fname +
                        " " +
                        serviceReq.user.user_lname}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {serviceReq.user.roles
                        .map((role) => role.role_name)
                        .join(", ")}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {serviceReq.service.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {serviceReq.created_at as string}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <span
                        className={
                          "py-2 px-4 rounded truncate " +
                          statusColors[serviceReq.state].background +
                          " " +
                          statusColors[serviceReq.state].text
                        }
                      >
                        {tofrench(serviceReq.state)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <small className="text-gray-500 text-sm w-full h-full flex items-center justify-center p-4">
            No Demandes found.
          </small>
        )}
      </div>
    </div>
  );
}
