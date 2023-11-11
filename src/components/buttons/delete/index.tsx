import {
    AccessControlContext,
    useCan,
    useDelete,
    useResource,
    useTranslate,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import React, { useContext } from "react";

import { Trash2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../ui";
import { DeleteButtonProps } from "../types";

export const DeleteButton: React.FC<DeleteButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    children,
    successNotification,
    errorNotification,
    hideText = false,
    accessControl,
    metaData,
    meta,
    dataProviderName,
    confirmTitle,
    confirmOkText,
    confirmCancelText,
    invalidates,
    ...rest
}) => {
    const accessControlContext = useContext(AccessControlContext);

    const accessControlEnabled =
        accessControl?.enabled ??
        accessControlContext.options.buttons.enableAccessControl;

    const hideIfUnauthorized =
        accessControl?.hideIfUnauthorized ??
        accessControlContext.options.buttons.hideIfUnauthorized;

    const translate = useTranslate();

    const { id, resource } = useResource(
        resourceNameFromProps ?? propResourceNameOrRouteName,
    );

    // const { mutationMode: mutationModeContext } = useMutationMode();

    // const mutationMode = mutationModeProp ?? mutationModeContext;

    // const { mutate, isLoading, variables } = useDelete();

    const { data } = useCan({
        resource: resource?.name,
        action: "delete",
        params: { id: recordItemId ?? id, resource },
        queryOptions: {
            enabled: accessControlEnabled,
        },
    });

    const disabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    // const { setWarnWhen } = useWarnAboutChange();

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        // <Popconfirm
        //     key="delete"
        //     okText={confirmOkText ?? translate("buttons.delete", "Delete")}
        //     cancelText={
        //         confirmCancelText ?? translate("buttons.cancel", "Cancel")
        //     }
        //     okType="danger"
        //     title={
        //         confirmTitle ?? translate("buttons.confirm", "Are you sure?")
        //     }
        //     okButtonProps={{ disabled: isLoading }}
        //     onConfirm={(): void => {
        // if ((recordItemId ?? id) && identifier) {
        //     setWarnWhen(false);
        //     mutate(
        //         {
        //             id: recordItemId ?? id ?? "",
        //             resource: identifier,
        //             mutationMode,
        //             successNotification,
        //             errorNotification,
        //             meta: pickNotDeprecated(meta, metaData),
        //             metaData: pickNotDeprecated(meta, metaData),
        //             dataProviderName,
        //             invalidates,
        //         },
        //         {
        //             onSuccess: (value) => {
        //                 onSuccess && onSuccess(value);
        //             },
        //         },
        //     );
        // }
        //     }}
        //     disabled={
        //         typeof rest?.disabled !== "undefined"
        //             ? rest.disabled
        //             : data?.can === false
        //     }
        // >
        <Button
            title={disabledTitle()}
            disabled={data?.can === false}
            data-testid={RefineButtonTestIds.DeleteButton}
            variant={"destructive"}
            className={RefineButtonClassNames.DeleteButton}
            size={hideText ? "icon" : rest.size ?? "default"}
            {...rest}
        >
            <Trash2 className={cn(!hideText ? "mr-2" : "")} size={16} />
            {!hideText && (children ?? translate("buttons.delete", "Delete"))}
        </Button>
        // </Popconfirm>
    );
};
