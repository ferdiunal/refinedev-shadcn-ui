import { FC, ReactNode } from "react";
import { Button, Sheet, SheetContent, SheetTrigger } from "../../../ui";
import { SidebarMobileProps } from "./type";

export const SidebarMobile: FC<SidebarMobileProps> = ({ children }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="-m-2.5 select-none text-foreground xl:hidden"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
                {children as ReactNode}
            </SheetContent>
        </Sheet>
    );
};

export default SidebarMobile;
