import { CanAccess, ITreeMenu, useMenu } from "@refinedev/core";
import { List } from "lucide-react";
import { FC, ReactNode, useMemo } from "react";

import { cn } from "../../../lib/utils";
import { Button, Link } from "../../../ui";
import { ThemedSiderV2Props } from "./type";
import { RefineLayoutTitleProps } from "@refinedev/ui-types";

const ThemedSiderV2MenuItem: FC<{
    selectedKey?: string;
    resource: ITreeMenu;
    asChild?: boolean;
    children?: ReactNode;
    icon?: ReactNode;
}> = ({ resource, selectedKey, asChild = false, children }) => {
    const active = useMemo(() => {
        return resource.key === selectedKey;
    }, [resource, selectedKey]);

    const label = useMemo(() => {
        return String(resource.label ?? resource.meta?.label);
    }, [resource]);

    const href = useMemo(() => {
        return String(resource.route);
    }, [resource]);

    return (
        <CanAccess
            resource={resource.name.toString()}
            action="list"
            params={{
                resource,
            }}
        >
            <li>
                <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className={cn(
                        active ? "bg-accent-foreground text-accent" : "",
                        "gap-x-3 w-full justify-start p-0 pl-2.5",
                    )}
                >
                    <Link
                        to={href}
                        title={label as string}
                        className="inline-flex flex-row gap-x-2"
                    >
                        {resource.icon ?? <List size={20} />}
                        {asChild ? children : label}
                    </Link>
                </Button>
            </li>
        </CanAccess>
    );
};

export const ThemedSiderV2Menu: FC<{
    meta?: Record<string, unknown>;
}> = ({ meta }) => {
    const { menuItems, selectedKey } = useMenu({ meta });

    const MenuItems = useMemo(
        () =>
            menuItems.map((item: ITreeMenu) => (
                <ThemedSiderV2MenuItem
                    key={item.key}
                    resource={item}
                    selectedKey={selectedKey}
                />
            )),
        [menuItems, selectedKey],
    );

    return (
        <ul role="list" className="flex w-full flex-1 flex-col gap-y-1.5">
            {MenuItems}
        </ul>
    );
};
const defaultIcon = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9Z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V6Z"
            fill="currentColor"
        />
    </svg>
);

const DefaultTitle: FC<RefineLayoutTitleProps> = () => {
    return (
        <Link
            href="/"
            title={"refine"}
            className="text-foreground inline-flex flex-row items-center"
        >
            {defaultIcon}
            <span className="ml-2.5 text-xl font-bold">{"refine"}</span>
        </Link>
    );
};

export const ThemedSiderV2: FC<ThemedSiderV2Props> = ({
    meta,
    className,
    Title = DefaultTitle,
}) => {
    return (
        <div
            className={cn(
                "lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col",
                className,
            )}
        >
            <div className="flex grow flex-col overflow-y-auto bg-white dark:bg-black border-r border-border h-[100dvh]">
                <div className="flex h-16 shrink-0 items-center px-2.5 text-foreground">
                    {typeof Title === "function" ? (
                        <Title collapsed={false} />
                    ) : (
                        Title
                    )}
                </div>
                <nav className="flex flex-1 flex-col px-1.5">
                    <ThemedSiderV2Menu meta={meta} />
                </nav>
            </div>
        </div>
    );
};

export default ThemedSiderV2;
