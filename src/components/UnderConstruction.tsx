import { Construction } from "lucide-react";

interface UnderConstructionProps {
  pageName: string;
}

export function UnderConstruction({ pageName }: UnderConstructionProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-gray-600">
      <Construction size={150} />
      <h1 className="text-gray-800">{pageName} Under Construction</h1>
      <p className="text-sm">
        Sorry, this page is under construction. Please check back later.
      </p>
    </div>
  );
}
