import { SearchForm } from "@/components/global/Search";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AddServiceDialog } from "./AddServiceDialog";
import { useServices } from "@/hooks/useServices";
import { searchServices } from "@/lib/axios/services/search";
import { ServiceOptions } from "./ServiceOptions";

export function ServicesNav() {
  const { setServices, setOption, option } = useServices();
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function search() {
    const services = await searchServices(searchQuery);
    setServices(services);
  }

  useEffect(() => {
    search();
  }, [searchQuery]);

  return (
    <div
      className={
        "h-12 w-full bg-white rounded p-2 flex items-center " +
        (option == "services" ? "justify-between" : "justify-end")
      }
    >
      {option == "services" && (
        <SearchForm
          className="w-[400px]"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <div className="h-full w-auto flex gap-2">
        <ServiceOptions onChange={setOption} />
        <AddServiceDialog>
          <Button className="bg-blue-500 hover:bg-blue-500 text-white h-full">
            Ajouter
          </Button>
        </AddServiceDialog>
      </div>
    </div>
  );
}
