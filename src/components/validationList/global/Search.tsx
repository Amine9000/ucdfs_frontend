import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { setStateType } from "@/types/setState";
import { Search } from "lucide-react";

type SearchFormProps = {
  className?: string;
  searchQuery: string;
  setSearchQuery: setStateType<string>;
};

export function SearchForm({
  className,
  searchQuery,
  setSearchQuery,
}: SearchFormProps) {
  return (
    <div
      className={cn(
        "h-full w-full flex items-center justify-between",
        className ? className : ""
      )}
    >
      <Input
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        type="text"
        placeholder="search for ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button className="text-white bg-sky-500 hover:bg-sky-700 rounded-l-none">
        <Search className="size-6" />
      </Button>
    </div>
  );
}
