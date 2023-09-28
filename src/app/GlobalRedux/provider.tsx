`use client`;

import { Provider as ReduxProviders } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <ReduxProviders store={store}>{children}</ReduxProviders>;
}
