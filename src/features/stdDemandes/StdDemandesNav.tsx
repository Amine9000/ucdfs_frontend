import { SearchForm } from "@/components/global/Search";
import { useEffect, useState } from "react";
import { DemandesOptions } from "./DemandesOptions";
import { useDemandes } from "@/hooks/useDemandes";
import { searchServices } from "@/lib/axios/services/search";

export function StdDemandesNav() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setOption, option, setServices } = useDemandes();

  async function search() {
    const services = await searchServices(searchQuery);
    setServices(services);
  }

  useEffect(() => {
    search();
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white rounded p-2 flex items-center justify-between">
      <div>
        {option == "services" && (
          <SearchForm
            className="w-[400px]"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
      <DemandesOptions onChange={(option) => setOption(option)} />
    </div>
  );
}
