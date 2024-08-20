import { HOST_LINK } from "@/constants/host";
import { Status, statusColors } from "@/types/Demande";
import { DemandeRequestType } from "@/types/serviceRequestType";
import { setStateType } from "@/types/setState";
import { X } from "lucide-react";
import moment from "moment";

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
        <div
          className="p-2 hover:bg-slate-100 rounded cursor-pointer"
          onClick={() => setSelectedDemande(undefined)}
        >
          <X className="text-slate-400" size={20} />
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
          <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Nom complete
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {student.student_fname} {student.student_lname}
            </div>
          </div>
          {student.student_cin && (
            <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                CIN
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_cin}
              </div>
            </div>
          )}
          {student.student_cne && (
            <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                CNE
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_cne}
              </div>
            </div>
          )}
          {student.student_code && (
            <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                Code
              </label>
              <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
                {student.student_code}
              </div>
            </div>
          )}
          {student.student_birthdate && (
            <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
              <label className="text-slate-500 w-1/3" htmlFor="">
                BirthDate
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
          <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Titre
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {service.name}
            </div>
          </div>
          <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Description
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {service.description}
            </div>
          </div>
          <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Date de début
            </label>
            <div className="text-slate-800 border-l-2 border-slate-800 px-4 w-2/3">
              {moment(created_at).format("MMMM, Do") ?? "None"}
            </div>
          </div>
          <div className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded">
            <label className="text-slate-500 w-1/3" htmlFor="">
              Etat
            </label>
            <div
              className={
                "border-l-2 border-slate-800 px-4 w-2/3 " +
                statusColors[state as Status].text
              }
            >
              {state}
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
                  className="flex justify-start items-center h-8 gap-4 bg-slate-100 text-sm px-4 py-1 rounded"
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
