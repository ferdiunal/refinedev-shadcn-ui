import {
    useBack,
    useNavigation,
    useResource,
    useRouterType,
    type BaseRecord,
    type HttpError,
} from "@refinedev/core";
import type { UseFormReturnType } from "@refinedev/react-hook-form";
import type {
    DetailedHTMLProps,
    FormHTMLAttributes,
    PropsWithChildren,
} from "react";
import { type FieldValues } from "react-hook-form";
import { Button, Card, CardContent, CardFooter, FormUI } from "../../ui";
import { SaveButton } from "../buttons";
import { Combobox } from "./combobox";
import { FormField } from "./field";
import { Select } from "./select";

type NativeFormProps = Omit<
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    "onSubmit"
>;

type FormProps<
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
> = PropsWithChildren &
    UseFormReturnType<
        TQueryFnData,
        TError,
        TVariables,
        TContext,
        TData,
        TResponse,
        TResponseError
    > & {
        formProps?: NativeFormProps;
    };

export const Form = <
    TQueryFnData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends FieldValues = FieldValues,
    TContext extends object = {},
    TData extends BaseRecord = TQueryFnData,
    TResponse extends BaseRecord = TData,
    TResponseError extends HttpError = TError,
>({
    formProps,
    saveButtonProps,
    ...props
}: FormProps<
    TQueryFnData,
    TError,
    TVariables,
    TContext,
    TData,
    TResponse,
    TResponseError
>) => {
    const { resource: _resource, action } = useResource();
    const routerType = useRouterType();
    const back = useBack();
    const { goBack } = useNavigation();

    const onBack =
        action !== "list" || typeof action !== "undefined"
            ? routerType === "legacy"
                ? goBack
                : back
            : undefined;

    // @ts-ignore
    const onSubmit = props.handleSubmit((data: TQueryFnData) => {
        // @ts-ignore
        saveButtonProps?.onClick?.(data);
    });

    return (
        <FormUI {...props}>
            <form {...formProps} onSubmit={onSubmit}>
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        {props.children}
                    </CardContent>

                    <CardFooter className="flex justify-end gap-x-4">
                        <Button
                            type="button"
                            onClick={onBack}
                            disabled={props.refineCore.formLoading}
                            variant="outline"
                        >
                            Cancel
                        </Button>

                        <SaveButton
                            type="submit"
                            loading={props.refineCore.formLoading}
                        />
                    </CardFooter>
                </Card>
            </form>
        </FormUI>
    );
};

Form.Field = FormField;
Form.Combobox = Combobox;
Form.Select = Select;
