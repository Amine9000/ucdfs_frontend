import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Demande, Status } from "@/types/Demande";
import moment from "moment";

const demandesStatusColors: { [k in Status]: { text: string; bg: string } } = {
  Pending: {
    text: "text-blue-500",
    bg: "bg-blue-50",
  },
  InProgress: {
    text: "text-orange-500",
    bg: "bg-orange-50",
  },
  Approved: {
    text: "text-green-500",
    bg: "bg-green-50",
  },
  Rejected: {
    text: "text-red-500",
    bg: "bg-red-50",
  },
};

const demandes: Demande[] = [
  {
    numero: "D001",
    title: "Déclaration de perte carte d'étudiant",
    description:
      "Déclaration officielle de la perte de la carte d'étudiant pour obtenir une nouvelle carte.",
    date: "2024-08-01",
    status: Status.Pending,
  },
  {
    numero: "D002",
    title: "Demande de transfert de bourse",
    description:
      "Demande de transfert de bourse vers une autre université ou institution.",
    date: "2024-07-25",
    status: Status.Approved,
  },
  {
    numero: "D003",
    title: "Demande blocage semestre",
    description:
      "Demande pour bloquer un semestre en cas de difficultés personnelles ou académiques.",
    date: "2024-07-20",
    status: Status.InProgress,
  },
  {
    numero: "D004",
    title: "Support Technique pour un problème de connexion",
    description:
      "Demande de support technique pour résoudre un problème de connexion.",
    date: "2024-08-05",
    status: Status.Rejected,
  },
];

export function SentDemandesTable() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-10/12">
        <Table>
          <TableCaption>La liste de vos demandes.</TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-1/12">Numéro</TableHead>
              <TableHead className="w-4/12">Titre</TableHead>
              <TableHead className="w-4/12">Description</TableHead>
              <TableHead className="w-2/12">Envoyé à</TableHead>
              <TableHead className="w-1/12">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demandes.map((demande) => (
              <TableRow className="hover:bg-transparent" key={demande.title}>
                <TableCell className="font-medium text-gray-600">
                  {demande.numero}
                </TableCell>
                <TableCell className="font-medium text-gray-600">
                  {demande.title}
                </TableCell>
                <TableCell className="text-gray-600">
                  {demande.description}
                </TableCell>
                <TableCell>
                  <div className={cn("text-sm text-gray-600")}>
                    {moment(demande.date).format("MMMM, Do")}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "py-1 px-4 rounded-md text-center text-sm",
                      demandesStatusColors[demande.status as Status].text,
                      demandesStatusColors[demande.status as Status].bg
                    )}
                  >
                    {demande.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
