import { SidebarItemType } from "@/types/sidebarItem";

type contentProps = {
  content: SidebarItemType | null;
};

export default function Content({ content }: contentProps) {
  return (
    <div className="w-full flex-grow rounded flex items-center justify-center overflow-y-auto">
      {content && content.element}
      {!content && (
        <div className="text-sm text-slate-500 text-center">No Content</div>
      )}
    </div>
  );
}
