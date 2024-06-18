import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FileSearch() {
  return (
    <div className="h-full w-full max-w-[400px] flex items-center justify-between">
      <Input
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        type="text"
        placeholder="search for ..."
      />
      <Button className="text-white bg-sky-500 hover:bg-sky-700 rounded-l-none">
        <Search className="size-6" />
      </Button>
    </div>
  );
}
