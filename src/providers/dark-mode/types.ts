export type DarkMode = "dark" | "light" | "system";

export type DarkModeProviderProps = {
    children: React.ReactNode;
    defaultDarkMode?: DarkMode;
    storageKey?: string;
};

export type DarkModeProviderState = {
    theme: DarkMode;
    setDarkMode: (theme: DarkMode) => void;
};

export type DarkModeProvider = DarkModeProviderProps;
