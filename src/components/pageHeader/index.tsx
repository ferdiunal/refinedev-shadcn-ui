import { FC } from "react";
import { cn } from "../../lib/utils";
import { PageHeaderProps } from "./type";

export const PageHeader: FC<PageHeaderProps> = ({ extra, ...props }) => {
    return (
        <div
            className={cn(
                "flex h-20 items-end lg:justify-between",
                props.className,
            )}
        >
            <div className="min-w-0 flex-1">
                {props.breadcrumb}
                <div className="inline-flex flex-row items-center gap-x-4 mt-3">
                    <div className="inline-flex flex-col">
                        <h2 className="text-2xl font-bold leading-7 text-black dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                            {props.title}
                        </h2>
                        {props.subTitle && (
                            <div className="mt-2 flex items-center text-sm text-gray-300">
                                {props.subTitle}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex lg:ml-4 lg:mt-0">{extra}</div>
        </div>
    );
};
