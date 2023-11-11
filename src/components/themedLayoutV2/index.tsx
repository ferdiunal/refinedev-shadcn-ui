import { FC, ReactNode, useMemo } from "react";
import Navbar from "./navbar";
import ThemedSiderV2 from "./sider";
import SidebarMobile from "./sider-mobile";
import { LayoutProps } from "./type";
import { Toaster } from "@/ui/toaster";

export const ThemedLayoutV2: FC<LayoutProps> = ({
    children,
    darkModeProvider,
    defaultDarkMode,
    storageKey,
    Title,
    Footer,
}) => {
    const Container = () => {
        return (
            <>
                <ThemedSiderV2 className="hidden" Title={Title} />
                <div className="xl:pl-52 bg-white dark:bg-black text-foreground">
                    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
                        <SidebarMobile>
                            <ThemedSiderV2 Title={Title} />
                        </SidebarMobile>
                        <Navbar darkMode={!!darkModeProvider} />
                    </header>
                    <main className="relative px-4 space-y-1">
                        {children as ReactNode}
                    </main>
                    {Footer ? (
                        <Footer />
                    ) : (
                        <footer className="py-2.5 border-t border-border mt-4 flex-none flex flex-row items-center justify-between px-4 text-xs gap-x-4">
                            <span>refine © 2023</span>
                            <div className="flex flex-row justify-end items-center relative gap-x-4">
                                <a href="https://ferdiunal.tech">ferdiunal.tech</a>
                                <a href="https://refine.dev">refine.dev</a>
                            </div>
                        </footer>
                    )}
                </div>

                <Toaster />
            </>
        );
    };

    if (darkModeProvider) {
        const DarkModeProvider = useMemo(() => {
            return darkModeProvider;
        }, [darkModeProvider]);

        return (
            <DarkModeProvider
                defaultDarkMode={defaultDarkMode}
                storageKey={storageKey}
            >
                <Container />
            </DarkModeProvider>
        );
    }

    return <Container />;
};

export { ThemedSiderV2 };
