"use client";

import type {
    Content as SelectContentType,
    SelectProps as SelectCoreProps,
} from "@radix-ui/react-select";
import { BaseOption } from "@refinedev/core";
import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
    FormControl,
    SelectContent,
    SelectItem,
    SelectTrigger,
    Select as SelectUI,
    SelectValue,
} from "../../ui";

type SelectProps = SelectCoreProps & {
    placeholder?: string;
    emptyMessage?: string;
    onChange?: (value: string) => void;
    options?: BaseOption[];
};

export const Select = forwardRef<
    React.ElementRef<typeof SelectContentType>,
    SelectProps
>(({ ...props }, ref) => {
    return (
        <SelectUI
            disabled={props.options?.length === 0}
            onValueChange={props.onChange}
            defaultValue={props.value}
            value={props.value}
        >
            <FormControl>
                <SelectTrigger className={cn("sm:w-[250px]")}>
                    <SelectValue placeholder={props.placeholder ?? "Select"} />
                </SelectTrigger>
            </FormControl>
            <SelectContent className={cn("sm:w-[250px]")} ref={ref}>
                {props.options?.map((option, key: number) => (
                    <SelectItem key={key} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectUI>
    );
});

Select.displayName = "Select";
