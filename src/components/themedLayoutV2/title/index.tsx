import { FC } from "react";
import { TitleProps } from "./type";

export const Title: FC<TitleProps> = ({ icon, text }) => {
    return (
        <div className="flex flex-row items-center gap-x-2 justify-center">
            {icon} {text}
        </div>
    );
};

export default Title;
