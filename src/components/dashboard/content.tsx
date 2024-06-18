import { SidebarItemType } from "@/types/sidebarItem";

type contentProps = {
  content: SidebarItemType;
};

export default function Content({ content }: contentProps) {
  return (
    <div className="w-full flex-grow rounded flex items-center justify-center overflow-y-auto">
      {content.element}
    </div>
  );
}
