import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";
import { DemandeDialog } from "./DemandeDialog";
import { useDemandes } from "@/hooks/useDemandes";
import { useEffect } from "react";
import { fetchServices } from "@/lib/axios/services/fechAll";

export function AllDemandesTable() {
  const { services, setServices } = useDemandes();

  async function getDemandes() {
    const demandes = await fetchServices();
    setServices(demandes);
  }

  useEffect(() => {
    getDemandes();
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-10/12">
        {services && services.length > 0 ? (
          <Table>
            <TableCaption>Liste de vos demandes.</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-4/12">Titre</TableHead>
                <TableHead className="w-6/12">Description</TableHead>
                <TableHead className="w-2/12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((demande) => (
                <TableRow className="hover:bg-gray-50 group" key={demande.name}>
                  <TableCell className="font-medium text-gray-600">
                    {demande.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {demande.description}
                  </TableCell>
                  <TableCell className="flex items-center">
                    <DemandeDialog demande={demande}>
                      <div className="py-1 px-4 text-gray-600 group-hover:text-white bg-blue-50 group-hover:bg-blue-500 cursor-pointer rounded duration-700 transition-all">
                        <Check size={20} />
                      </div>
                    </DemandeDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-gray-600 py-10">
            <p>Aucune service n'a été trouvée.</p>
          </div>
        )}
      </div>{" "}
    </div>
  );
}
