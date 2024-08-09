import { SearchForm } from "@/components/global/Search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function UsersNavbar() {
  //   const [pageNum, setPageNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function fetchData() {
    // if (searchQuery.length > 0)
    //   searchEtapes(setEtapes, searchQuery, pageLength, pageNum);
    // if (searchQuery.length == 0) {
    //   const newData = await getEtapes(pageNum, pageLength);
    //   setEtapes(newData);
    // }
  }
  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white flex-shrink-0 rounded flex items-center justify-between gap-2 px-4">
      <SearchForm
        className="w-[400px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="h-full w-auto flex items-center gap-2">
        {/* <Pagination pageNum={pageNum} setPageNum={setPageNum} more={morePage} /> */}
        <Button className="text-white bg-sky-500 hover:bg-sky-700">
          Ajouter <Plus size={20} className="text-white ml-2" />
        </Button>{" "}
      </div>
    </div>
  );
}
