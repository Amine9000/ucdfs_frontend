import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setStateType } from "@/types/setState";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  pageNum: number;
  setPageNum: setStateType<number>;
  more: boolean;
};

export function Pagination({ pageNum, setPageNum, more }: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setPageNum(pageNum - 1 < 1 ? 1 : pageNum - 1)}
        className="bg-slate-100 hover:bg-slate-200 transition-all duration-200 ease-in text-slate-700 px-2"
      >
        <ChevronLeft size={20} />
      </Button>
      <Input
        type="text"
        onChange={(e) =>
          setPageNum(parseInt(e.target.value) ? parseInt(e.target.value) : 1)
        }
        value={pageNum}
        className="w-12 text-center focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-600"
      />
      <Button
        onClick={() => setPageNum(more ? pageNum + 1 : pageNum)}
        className="bg-slate-100 hover:bg-slate-200 transition-all duration-200 ease-in text-slate-700 px-2"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
