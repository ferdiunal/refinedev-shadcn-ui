import { useEffect, useState } from "react";
import { DarkMode, DarkModeProviderProps } from "./types";
import { DarkModeProviderContext } from "./context";

export function ViteDarkModeProvider({
    children,
    defaultDarkMode = "system",
    storageKey = "vite-ui-theme",
    ...props
}: DarkModeProviderProps) {
    const [theme, setDarkMode] = useState<DarkMode>(
        () => (localStorage.getItem(storageKey) as DarkMode) || defaultDarkMode,
    );

    useEffect(() => {
        const root = window.document.documentElement;
        const darkModePreference = window.matchMedia(
            "(prefers-color-scheme: dark)",
        );

        const activateDarkMode = () => {
            root.classList.remove("light", "dark");

            if (theme === "system") {
                const systemDarkMode = darkModePreference.matches
                    ? "dark"
                    : "light";

                root.classList.add(systemDarkMode);
                return;
            }

            root.classList.add(theme);
        };

        activateDarkMode();

        const darkModePreferenceListener = (e: MediaQueryListEvent) => {
            if (theme !== "system") return;

            root.classList.remove("light", "dark");
            if (e.matches) {
                const systemDarkMode = e.matches ? "dark" : "light";

                root.classList.add(systemDarkMode);
            }
        };

        darkModePreference.addEventListener(
            "change",
            darkModePreferenceListener,
        );

        return () =>
            darkModePreference.removeEventListener(
                "change",
                darkModePreferenceListener,
            );
    }, [theme]);

    const value = {
        theme,
        setDarkMode: (theme: DarkMode) => {
            localStorage.setItem(storageKey, theme);
            setDarkMode(theme);
        },
    };

    return (
        <DarkModeProviderContext.Provider {...props} value={value}>
            {children}
        </DarkModeProviderContext.Provider>
    );
}
