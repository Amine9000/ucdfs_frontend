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
    <div className="w-full h-full flex justify-center overflow-auto">
      <div className="w-full h-full min-w-[500px] min-h-[500px] flex justify-center">
        {serviceRequests.length ? (
          <Table className="mb-24">
            <TableCaption>Liste des demandes.</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-white">
                <TableHead>Full Name</TableHead>
                <TableHead>CNE</TableHead>
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
                      {serviceReq.student.student_fname +
                        " " +
                        serviceReq.student.student_lname}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {serviceReq.student.student_cne}
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
          <small className="text-slate-600 text-sm text-center w-full p-4">
            No Service found.
          </small>
        )}
      </div>
    </div>
  );
}
