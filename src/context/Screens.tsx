import { EtapeListScreen } from "@/components/validationList/EtapesList/EtapeListScreen";
import { StudentsListScreen } from "@/components/validationList/StudentsData/StudentsListScreen";
import { ScreenItemType } from "@/types/ScreenItem";
import { ReactNode, createContext, useState } from "react";

type screenContextType = {
  screen: ScreenItemType;
  screenSelectedHandler: (title: string, etape_code?: string) => void;
};

export const ScreenContext = createContext<screenContextType | null>(null);

type ScreensProviderProps = {
  children: ReactNode;
};

const screensData: ScreenItemType[] = [
  {
    screen: {
      title: "EtapeList",
      component: <EtapeListScreen />,
    },
    etape_code: undefined,
  },
  {
    screen: {
      title: "StudentsData",
      component: <StudentsListScreen />,
    },
    etape_code: undefined,
  },
];

export function ScreensProvider({ children }: ScreensProviderProps) {
  const [screen, setScreen] = useState(screensData[0]);
  function screenSelectedHandler(title: string, etape_code?: string) {
    const nScreen =
      screensData.filter((scr) => scr.screen.title == title)[0] ||
      screensData[0];
    nScreen.etape_code = etape_code;
    setScreen({ ...nScreen });
  }
  const screenContextValue = {
    screen,
    screenSelectedHandler,
  };
  return (
    <ScreenContext.Provider value={screenContextValue}>
      {children}
    </ScreenContext.Provider>
  );
}
