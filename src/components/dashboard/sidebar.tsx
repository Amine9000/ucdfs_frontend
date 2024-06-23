import { SidebarItemType } from "@/types/sidebarItem";
import { Position, SidebarSectionType } from "@/types/sidebarSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type sidebarProps = {
  sidebarSections: SidebarSectionType[];
  handleItemSelected: (item: SidebarItemType) => void;
};

export default function SideBar({
  sidebarSections,
  handleItemSelected,
}: sidebarProps) {
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
        {getSection(sidebarSections, handleItemSelected, Position.TOP)}
        {getSection(sidebarSections, handleItemSelected, Position.BOTTOM)}
      </div>
    </div>
  );
}

function getSection(
  sections: SidebarSectionType[],
  handleItemSelected: (item: SidebarItemType) => void,
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
          {sectionItemMapper(section.items, handleItemSelected)}
        </div>
      );
    });
}

function sectionItemMapper(
  items: SidebarItemType[],
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
                  className="w-full h-auto flex items-center justify-center py-2 hover:bg-sky-600 rounded-md cursor-pointer text-gray-600 hover:text-white transition-all ease-out duration-500"
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
