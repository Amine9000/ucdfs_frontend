import { useDemandes } from "@/hooks/useDemandes";

export function StdDemandesBody() {
  const { bodyContent } = useDemandes();
  return (
    <div className="w-full h-full p-2 rounded bg-white overflow-auto">
      {bodyContent}
    </div>
  );
}
