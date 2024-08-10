import { AllDemandesTable } from "./AllDemandesTable";
import { ServicesNav } from "./ServicesNav";

export function Services() {
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col gap-2">
      <ServicesNav />
      <AllDemandesTable />
    </div>
  );
}
