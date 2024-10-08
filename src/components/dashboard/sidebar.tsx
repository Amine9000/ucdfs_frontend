import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTabs } from "@/hooks/useTabs";
import { cn } from "@/lib/utils";

export default function SideBar() {
  const { navigateTo, sidebarState, itemSelected } = useTabs();
  return (
    <div className="h-full w-[64px] p-2 flex-shrink-0 flex flex-col items-center justify-between bg-white rounded-md">
      <header className="w-full h-[48px] p-1 flex items-center justify-center bg-slate-50 rounded-md">
        <img
          src="logo_ucd_fs_short.svg"
          className="w-5/6 h-auto cursor-pointer"
          alt="FS logo"
        />
      </header>
      <div className="w-full h-full flex flex-col justify-between items-center">
        {getSection(sidebarState, navigateTo, itemSelected, Position.TOP)}
        {getSection(sidebarState, navigateTo, itemSelected, Position.BOTTOM)}
      </div>
    </div>
  );
}

function getSection(
  sections: SidebarSectionType[],
  handleItemSelected: (item: SidebarItemType) => void,
  itemSelected: SidebarItemType | null,
  position: Position
) {
  return sections
    .filter((section) => section.position == position)
    .map((section) => {
      return (
        <div key={section.id} className="w-full h-auto">
          <header className="w-full h-auto uppercase text-gray-500 flex justify-center py-4 text-xs">
            {section.title}
          </header>
          {sectionItemMapper(section.items, itemSelected, handleItemSelected)}
        </div>
      );
    });
}

function sectionItemMapper(
  items: SidebarItemType[],
  itemSelected: SidebarItemType | null,
  handleItemSelected: (item: SidebarItemType) => void
) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        return (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger className="w-full h-auto">
                <div
                  onClick={() => handleItemSelected(item)}
                  key={i}
                  className={cn(
                    "w-full h-auto flex items-center justify-center py-2 rounded-md cursor-pointer text-gray-600 hover:text-blue-400 transition-all ease-out duration-500",
                    itemSelected?.label == item.label &&
                      "bg-sky-50 text-blue-700 hover:text-blue-700"
                  )}
                >
                  {<item.icon className="h-[32px]" />}
                </div>
              </TooltipTrigger>
              <TooltipContent className="relative top-11 left-[80px]">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
