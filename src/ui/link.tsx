import { useLink, useRouterContext, useRouterType } from "@refinedev/core";
import { forwardRef } from "react";

export const Link = forwardRef(({ children, ...props }: any, ref: any) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <ActiveLink ref={ref} {...props}>
            {children}
        </ActiveLink>
    );
});

Link.displayName = "Link";
