import { createContext } from "react";
import { DarkModeProviderState } from "./types";

export const initialState: DarkModeProviderState = {
    theme: "system",
    setDarkMode: () => null,
};

export const DarkModeProviderContext =
    createContext<DarkModeProviderState>(initialState);

export * from "./dark-mode-provider.vite";
