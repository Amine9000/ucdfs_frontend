import { SearchForm } from "@/components/global/Search";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ServicesNav() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="h-12 w-full bg-white rounded p-2 flex items-center justify-between">
      <SearchForm
        className="w-[400px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Button className="bg-blue-500 hover:bg-blue-500 text-white">
        Ajouter
      </Button>
    </div>
  );
}
