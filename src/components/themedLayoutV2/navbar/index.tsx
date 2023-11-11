import * as React from "react";
import { NavbarProps } from "./type";
import { DarkMode } from "../../dark-mode";

export const Table: React.FC<NavbarProps> = ({ children, darkMode }) => {
    return (
        <nav className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
            {children}
            {darkMode && <DarkMode />}
        </nav>
    );
};

export default Table;
