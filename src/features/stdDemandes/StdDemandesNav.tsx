import { SearchForm } from "@/components/global/Search";
import { useState } from "react";
import { DemandesOptions } from "./DemandesOptions";
import { useDemandes } from "@/hooks/useDemandes";

export function StdDemandesNav() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setOption } = useDemandes();

  return (
    <div className="h-12 w-full rounded p-2 flex items-center justify-between">
      <SearchForm
        className="w-[400px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DemandesOptions onChange={(option) => setOption(option)} />
    </div>
  );
}
