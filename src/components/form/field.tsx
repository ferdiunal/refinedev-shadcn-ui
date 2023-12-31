import { ReactElement, cloneElement } from "react";
import {
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import {
    FormField as Field,
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui";
import { cn } from "@/lib/utils";

type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    label?: string;
    description?: string;
    className?: string;
    children: ReactElement<{
        field: ControllerRenderProps<TFieldValues, TName>;
    }>;
};
export const FormField = (props: FormFieldProps) => {
    return (
        <Field
            control={props.control}
            name={props.name}
            render={({ field }: { field: any }) => {
                return (
                    <FormItem className={cn(props.className)}>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            {cloneElement(props.children, {
                                ...field,
                                ...props.children.props,
                            })}
                        </FormControl>
                        {props.description && (
                            <FormDescription>
                                {props.description}
                            </FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};
