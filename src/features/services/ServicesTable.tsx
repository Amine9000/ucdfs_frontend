import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, Settings2, Trash2 } from "lucide-react";
import { HoverPopup } from "./HoverPopup";
import { useServices } from "@/hooks/useServices";
import { ServiceSheet } from "./ServiceSheet";
import { Option } from "@/types/Option";

export function ServicesTable() {
  const { services } = useServices();

  const options: Option[] = [
    {
      label: "Update",
      value: "update",
      callback: async () => {},
      icon: Settings2,
    },
    {
      label: "Delete",
      value: "delete",
      callback: () => {},
      icon: Trash2,
    },
  ];

  return (
    <div className="w-full h-full flex justify-center overflow-auto">
      <div className="w-full h-full min-h-[500px] lg:w-10/12 flex justify-center">
        {services.length ? (
          <Table className="mb-24">
            <TableCaption>Liste des demandes.</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-4/12">Titre</TableHead>
                <TableHead className="w-6/12">Description</TableHead>
                <TableHead className="w-2/12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, i) => {
                return (
                  <TableRow className="hover:bg-gray-50 group" key={i}>
                    <TableCell className="font-medium text-gray-600 p-0">
                      <HoverPopup
                        trigger={<div>{service.name}</div>}
                        demande={service}
                      />
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {service.description}
                    </TableCell>
                    <TableCell className="flex items-center w-full h-full">
                      <ServiceSheet data={service} options={options}>
                        <div className="py-1 px-4 text-gray-600 group-hover:text-white bg-blue-50 group-hover:bg-blue-500 cursor-pointer rounded duration-700 transition-all">
                          <Ellipsis size={20} />
                        </div>
                      </ServiceSheet>
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
