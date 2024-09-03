import { Status } from "@/types/Demande";

export const tofrench = (status: Status) => {
  switch (status) {
    case Status.Pending:
      return "en attente";
    case Status.Approved:
      return "approuvé";
    case Status.Rejected:
      return "refusé";
    case Status.InProgress:
      return "en cours";
  }
};
