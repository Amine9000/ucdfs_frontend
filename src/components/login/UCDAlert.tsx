import { ShieldX } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UCDAlertProps {
  message: string;
  title: string;
}

export function UCDAlert({ title, message }: UCDAlertProps) {
  return (
    <Alert variant="destructive">
      <ShieldX className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
