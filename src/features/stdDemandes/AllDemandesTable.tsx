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
import { Demande } from "@/types/Demande";

const demandes: Demande[] = [
  {
    name: "Déclaration de perte carte d'étudiant",
    description:
      "Déclaration officielle de la perte de la carte d'étudiant pour obtenir une nouvelle carte.",
    fields: [
      {
        name: "Nom",
        type: "string",
        required: true,
      },
      {
        name: "Prénom",
        type: "string",
        required: true,
      },
      {
        name: "Numéro d'étudiant",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "Demande de transfert de bourse",
    description:
      "Demande de transfert de bourse vers une autre université ou institution.",
    fields: [
      {
        name: "Nom",
        type: "string",
        required: true,
      },
      {
        name: "Numéro de bourse",
        type: "string",
        required: true,
      },
      {
        name: "Université actuelle",
        type: "string",
        required: true,
      },
      {
        name: "Université de destination",
        type: "string",
        required: true,
      },
    ],
  },
  {
    name: "Demande de blocage de semestre",
    description:
      "Demande pour bloquer un semestre en cas de difficultés personnelles ou académiques.",
    fields: [
      {
        name: "Nom",
        type: "string",
        required: true,
      },
      {
        name: "Motif du blocage",
        type: "string",
        required: true,
      },
      {
        name: "Date de début",
        type: "date",
        required: true,
      },
      {
        name: "Date de fin",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Demande d’annulation de blocage",
    description:
      "Demande d'annulation du blocage d'un semestre précédemment demandé.",
    fields: [
      {
        name: "Nom",
        type: "string",
        required: true,
        min: 1,
        max: 100,
      },
      {
        name: "Motif de l'annulation",
        type: "string",
        required: true,
        min: 10,
        max: 500,
      },
    ],
  },
  {
    name: "Retard au contrôle",
    description:
      "Déclaration de retard à un examen ou contrôle et demande de régularisation.",
  },
  {
    name: "Changement de filière",
    description:
      "Demande officielle pour changer de filière ou de programme d'études.",
  },
  {
    name: "Formulaire retrait definitif du bac",
    description:
      "Formulaire pour demander le retrait définitif de votre diplôme du baccalauréat.",
  },
  {
    name: "Formulaire retrait provisoire du bac",
    description:
      "Formulaire pour demander le retrait provisoire de votre diplôme du baccalauréat.",
  },
  {
    name: "Décharge Master",
    description: "Formulaire de décharge pour quitter un programme de Master.",
  },
  {
    name: "Demande de Dérogation réinscription en Master",
    description:
      "Demande spéciale pour obtenir une dérogation pour se réinscrire en Master après une interruption.",
  },
  {
    name: "Demande de retrait provisoire de la licence",
    description:
      "Demande de retrait provisoire du programme de licence pour une période déterminée.",
  },
  {
    name: "Demande de retrait définitif de la licence",
    description:
      "Demande de retrait définitif du programme de licence et arrêt des études.",
  },
];

export function AllDemandesTable() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full lg:w-10/12">
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
            {demandes.map((demande) => (
              <TableRow className="hover:bg-gray-50 group" key={demande.name}>
                <TableCell className="font-medium text-gray-600">
                  {demande.name}
                </TableCell>
                <TableCell className="text-gray-600">
                  {demande.description}
                </TableCell>
                <TableCell className="flex items-center">
                  <DemandeDialog demande={demande as Demande}>
                    <div className="py-1 px-4 text-gray-600 group-hover:text-white bg-blue-50 group-hover:bg-blue-500 cursor-pointer rounded duration-700 transition-all">
                      <Check size={20} />
                    </div>
                  </DemandeDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>{" "}
    </div>
  );
}
