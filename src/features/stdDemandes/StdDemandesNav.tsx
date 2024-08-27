import { SearchForm } from "@/components/global/Search";
import { useEffect, useState } from "react";
import { DemandesOptions } from "./DemandesOptions";
import { useDemandes } from "@/hooks/useDemandes";
import { searchServices } from "@/lib/axios/services/search";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { deleteServiceRequest } from "@/lib/axios/serviceRequests/deleteServiceRequest";

export function StdDemandesNav() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    setOption,
    option,
    setServices,
    selectedDemande,
    setSelectedDemande,
    setDemandes,
  } = useDemandes();

  async function search() {
    const services = await searchServices(searchQuery);
    setServices(services);
  }

  function handleCancelClick() {
    toast.promise(deleteServiceRequest(selectedDemande?.id ?? ""), {
      loading: "Deleting service request...",
      success: "Service request deleted successfully",
      error: "Failed to delete service request",
    });
    setDemandes((prev) => {
      const index = prev.findIndex(
        (demande) => demande.id === selectedDemande?.id
      );
      if (index !== -1) {
        prev.splice(index, 1);
      }
      return [...prev];
    });
    setSelectedDemande(null);
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedDemande(null);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    search();
  }, [searchQuery]);

  return (
    <div className="h-12 w-full bg-white rounded p-2 flex items-center justify-between">
      <div>
        {option == "services" && (
          <SearchForm
            className="w-[400px]"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
      <div className="h-full flex gap-2 items-center justify-between">
        <div>
          {selectedDemande != null && (
            <Button
              onClick={handleCancelClick}
              className="bg-slate-200 hover:bg-slate-300 text-slate-900"
            >
              annuler la demande
            </Button>
          )}
        </div>
        <DemandesOptions onChange={(option) => setOption(option)} />
      </div>
    </div>
  );
}
