import { ReactNode } from "react";

export type ScreenItemType = {
  screen: {
    title: string;
    component: ReactNode;
  };
  etape_code?: string;
};
