import { ScreenContext } from "@/context/Screens";
import { useContext } from "react";

export function useScreen() {
  const screenContextValue = useContext(ScreenContext);
  const { screen, screenSelectedHandler } = screenContextValue
    ? screenContextValue
    : { screen: null, screenSelectedHandler: null };
  return { screen, screenSelectedHandler };
}
