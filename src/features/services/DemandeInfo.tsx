import { Button } from "@/components/ui/button";
import { HOST_LINK } from "@/constants/host";
import { useServiceRequests } from "@/hooks/useServiceRequests";
import { updateState } from "@/lib/axios/serviceRequests/updateState";
import { tofrench } from "@/lib/toFrench";
import { Status, statusColors } from "@/types/Demande";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { setStateType } from "@/types/setState";
import { X } from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";

type DemandeInfoProps = {
  selectedDemande: DemandeRequestType | undefined;
  setSelectedDemande: setStateType<DemandeRequestType | undefined>;
};

export function DemandeInfo({
  selectedDemande,
  setSelectedDemande,
}: DemandeInfoProps) {
  if (selectedDemande == undefined) return null;
  const { state, service, student, created_at, studentServiceData } =
    selectedDemande;
  return (
    <div className="w-full min-w-[500px] h-full flex flex-col justify-start p-2 overflow-auto">
      <div className="py-2 px-4 flex justify-between items-center bg-slate-50 rounded">
        <h2 className="text-lg font-bold text-slate-700">
          Demande d'inscription
        </h2>
        <div className="h-full w-auto flex gap-4 items-center justify-between">
          <StatusBtn
            selectedDemande={selectedDemande}
            setSelectedDemande={setSelectedDemande}
          />
          <div
            className="p-2 hover:bg-slate-100 rounded cursor-pointer"
            onClick={() => setSelectedDemande(undefined)}
          >
            <X className="text-slate-400" size={20} />
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-50 rounded my-1 p-4">
        <div className="text-slate-500 text-sm my-1">Student</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center">
            <img
              src={HOST_LINK + "static/" + student.student_avatar_path}
              alt={student.student_fname + " " + student.student_lname}
              className="rounded-md size-24"
            />
          </div>
          <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Nom complete
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {student.student_fname} {student.student_lname}
            </div>
          </div>
          {student.student_cin && (
            <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                CIN
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_cin}
              </div>
            </div>
          )}
          {student.student_cne && (
            <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                CNE
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_cne}
              </div>
            </div>
          )}
          {student.student_code && (
            <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                Code
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_code}
              </div>
            </div>
          )}
          {student.student_birthdate && (
            <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                Date de naissance
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_birthdate}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* service */}
      <div className="w-full bg-slate-50 rounded my-1 p-4">
        <div className="text-slate-500 text-sm my-1">Service</div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Titre
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {service.name}
            </div>
          </div>
          <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Description
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {service.description}
            </div>
          </div>
          <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Date de début
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {moment(created_at).format("MMMM, Do") ?? "None"}
            </div>
          </div>
          <div className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Etat
            </label>
            <div
              className={
                "border-l-2 border-slate-800 px-4 w-2/3 " +
                statusColors[state as Status].text
              }
            >
              {tofrench(state) ?? "None"}
            </div>
          </div>
        </div>
      </div>
      {/* service data */}
      {studentServiceData.length > 0 && (
        <div className="w-full bg-slate-50 rounded my-1 p-4">
          <div className="text-slate-500 text-sm my-1">Student Data</div>
          <div className="flex flex-col gap-2">
            {studentServiceData.map((stdData, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-start items-center h-6 gap-4 text-sm px-4 py-1 rounded"
                >
                  <label className="text-slate-500 w-1/3" htmlFor="">
                    {stdData.field.name}
                  </label>
                  <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                    {stdData.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBtn({
  selectedDemande,
  setSelectedDemande,
}: {
  selectedDemande: DemandeRequestType | undefined;
  setSelectedDemande: setStateType<DemandeRequestType | undefined>;
}) {
  const { setServiceRequests } = useServiceRequests();
  function handleStateChange(newState: Status) {
    if (selectedDemande) {
      toast.promise(updateState(selectedDemande?.id, newState), {
        loading: "Updating ...",
        success: <p className="text-teal-600">State updated successfully</p>,
        error: <p className="text-red-500">Failed to update state</p>,
      });
      setServiceRequests((pre) => {
        const nServicerequests = pre.map((serviceReq) => {
          if (serviceReq.id == selectedDemande.id)
            return {
              ...serviceReq,
              state: newState,
            };
          else return serviceReq;
        });
        return nServicerequests;
      });
    }
    setSelectedDemande((pre) => {
      if (!pre) return pre;

      return { ...pre, state: newState };
    });
  }

  if (selectedDemande && selectedDemande.state == Status.Pending)
    return (
      <Button
        className={
          "px-4 w-2/3 focus-visible:ring-0 focus-visible:ring-offset-0 " +
          statusColors[Status.InProgress].text +
          " " +
          statusColors[Status.InProgress].background +
          " hover:" +
          statusColors[Status.InProgress].background
        }
        onClick={() => handleStateChange(Status.InProgress)}
      >
        En cours
      </Button>
    );
  if (selectedDemande && selectedDemande.state == Status.InProgress)
    return (
      <div className="flex justify-center items-center gap-2">
        <Button
          className={
            "px-4 w-2/3 bg-slate-100 hover:bg-slate-100 text-slate-700"
          }
          onClick={() => handleStateChange(Status.Pending)}
        >
          annuler
        </Button>
        <Button
          className={
            "px-4 w-2/3 " +
            statusColors[Status.Approved].text +
            " " +
            statusColors[Status.Approved].background +
            " hover:" +
            statusColors[Status.Approved].background
          }
          onClick={() => handleStateChange(Status.Approved)}
        >
          Approuvé
        </Button>
        <Button
          className={
            "px-4 w-2/3 " +
            statusColors[Status.Rejected].text +
            " " +
            statusColors[Status.Rejected].background +
            " hover:" +
            statusColors[Status.Rejected].background
          }
          onClick={() => handleStateChange(Status.Rejected)}
        >
          Refusé
        </Button>
      </div>
    );
  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        className={"px-4 w-2/3 bg-slate-100 hover:bg-slate-100 text-slate-700"}
        onClick={() => handleStateChange(Status.InProgress)}
      >
        annuler
      </Button>
      <div className="h-10 px-4 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center text-sm">
        Complété
      </div>
    </div>
  );
}
