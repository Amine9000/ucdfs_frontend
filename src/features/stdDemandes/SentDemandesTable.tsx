import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDemandes } from "@/hooks/useDemandes";
import { fetchStdDemandes } from "@/lib/axios/serviceRequests/fetchStdDemandes";
import { cn } from "@/lib/utils";
import { Status, statusColors } from "@/types/Demande";
import moment from "moment";
import { useEffect } from "react";

export function SentDemandesTable() {
  const { demandes, setDemandes } = useDemandes();

  async function getDemandes() {
    const dmds = await fetchStdDemandes();
    if (Array.isArray(dmds)) setDemandes(dmds);
  }

  useEffect(() => {
    getDemandes();
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-10/12 flex items-center">
        {demandes && demandes.length > 0 ? (
          <Table>
            <TableCaption>La liste de vos demandes.</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-3/12">Nom</TableHead>
                <TableHead className="w-4/12">Description</TableHead>
                <TableHead className="w-2/12">Envoyé à</TableHead>
                <TableHead className="w-2/12">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demandes.map((demande) => (
                <TableRow
                  className="hover:bg-transparent"
                  key={demande.service?.name ?? Math.random()}
                >
                  <TableCell className="font-medium text-gray-600">
                    {demande.service?.name ?? "None"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {demande.service?.description ?? "None"}
                  </TableCell>
                  <TableCell>
                    <div className={cn("text-sm text-gray-600")}>
                      {moment(demande.created_at).format("MMMM, Do") ?? "None"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "py-1 px-4 rounded-md text-center text-sm",
                        statusColors[demande.state as Status].text,
                        statusColors[demande.state as Status].background
                      )}
                    >
                      {demande.state ?? "None"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <small className="text-sm text-gray-600 text-center w-full">
            no requests.
          </small>
        )}
      </div>
    </div>
  );
}
