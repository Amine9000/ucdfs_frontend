import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { useServiceRequests } from "@/hooks/useServiceRequests";
import { useEffect } from "react";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { statusColors } from "@/types/Demande";
import { fetchServiceRequests } from "@/lib/axios/serviceRequests/fetchServicerequests";
import { ServiceRequestOptions } from "./ServiceRequestOptions";

export function Demandes() {
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
      <div className="w-full h-full min-h-[500px] lg:w-10/12 flex justify-center">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceRequests.map((serviceReq, i) => {
                return (
                  <TableRow className="hover:bg-gray-50 group" key={i}>
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
                          "py-2 px-4 rounded " +
                          statusColors[serviceReq.state].background +
                          " " +
                          statusColors[serviceReq.state].text
                        }
                      >
                        {serviceReq.state}
                      </span>
                    </TableCell>
                    <TableCell className="flex items-center w-full h-full">
                      <ServiceRequestOptions serviceRequest={serviceReq}>
                        <div className="py-1 px-4 text-gray-600 group-hover:text-white bg-blue-50 group-hover:bg-blue-500 cursor-pointer rounded duration-700 transition-all">
                          <Ellipsis size={20} />
                        </div>
                      </ServiceRequestOptions>
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
