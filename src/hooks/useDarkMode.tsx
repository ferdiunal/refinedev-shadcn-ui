import { DarkModeProviderContext } from "../providers/dark-mode/context";
import { useContext } from "react";

export const useDarkMode = () => {
    const context = useContext(DarkModeProviderContext);

    if (context === undefined)
        throw new Error("useDarkMode must be used within a DarkModeProvider");

    return context;
};
