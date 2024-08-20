import { useServices } from "@/hooks/useServices";

export function ServiceBody() {
  const { bodyConetent } = useServices();
  return (
    <div className="w-full h-full bg-white rounded overflow-auto">
      {bodyConetent}
    </div>
  );
}
