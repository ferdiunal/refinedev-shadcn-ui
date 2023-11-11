import { DarkModeProvider } from "@/providers/dark-mode/types";
import type { RefineThemedLayoutV2Props } from "@refinedev/ui-types";
import { FC } from "react";

type DarkModeProps = Omit<DarkModeProvider, "children">;

export type LayoutProps = Omit<
    RefineThemedLayoutV2Props,
    "Sider|Header|OffLayoutArea|dashboard"
> &
    DarkModeProps & {
        darkModeProvider?: FC<DarkModeProvider>;
    };
