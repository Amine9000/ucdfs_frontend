import { useTabs } from "@/hooks/useTabs";

export default function Content() {
  const { itemSelected } = useTabs();
  return (
    <div className="w-full flex-grow rounded flex items-center justify-center overflow-y-auto">
      {itemSelected && itemSelected.element}
      {!itemSelected && (
        <div className="text-sm text-slate-500 text-center">No Content</div>
      )}
    </div>
  );
}
