import { ServicesProvider } from "@/context/Services";
import { ServicesNav } from "./ServicesNav";
import { ServiceBody } from "./ServiceBody";
import { ServiceRequestsProvider } from "@/context/ServiceRequest";

export function Services() {
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col gap-2">
      <ServiceRequestsProvider>
        <ServicesProvider>
          <ServicesNav />
          <ServiceBody />
        </ServicesProvider>
      </ServiceRequestsProvider>
    </div>
  );
}
