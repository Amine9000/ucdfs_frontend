import { SearchForm } from "@/components/global/Search";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AddServiceDialog } from "./AddServiceDialog";
import { useServices } from "@/hooks/useServices";
import { searchServices } from "@/lib/axios/services/search";

export function ServicesNav() {
  const { setServices } = useServices();
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function search() {
    const services = await searchServices(searchQuery);
    setServices(services);
  }

  useEffect(() => {
    search();
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white rounded p-2 flex items-center justify-between">
      <SearchForm
        className="w-[400px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AddServiceDialog>
        <Button className="bg-blue-500 hover:bg-blue-500 text-white">
          Ajouter
        </Button>
      </AddServiceDialog>
    </div>
  );
}
