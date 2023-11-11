import {
    AccessControlContext,
    useCan,
    useNavigation,
    useResource,
    useTranslate,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import React, { useContext } from "react";

import { Button, Link } from "../../../ui";
import { EyeIcon } from "lucide-react";
import { ShowButtonProps } from "../types";

export const ShowButton: React.FC<ShowButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    hideText = false,
    accessControl,
    meta,
    children,
    onClick,
    ...rest
}) => {
    const accessControlContext = useContext(AccessControlContext);

    const accessControlEnabled =
        accessControl?.enabled ??
        accessControlContext.options.buttons.enableAccessControl;

    const hideIfUnauthorized =
        accessControl?.hideIfUnauthorized ??
        accessControlContext.options.buttons.hideIfUnauthorized;

    const { showUrl: generateShowUrl } = useNavigation();

    const translate = useTranslate();

    const { id, resource } = useResource(
        resourceNameFromProps ?? propResourceNameOrRouteName,
    );

    const { data } = useCan({
        resource: resource?.name,
        action: "show",
        params: { id: recordItemId ?? id, resource },
        queryOptions: {
            enabled: accessControlEnabled,
        },
    });

    const showButtonDisabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const showUrl =
        resource && (recordItemId || id)
            ? generateShowUrl(resource, recordItemId! ?? id!, meta)
            : "";

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Button
            asChild
            disabled={data?.can === false}
            title={showButtonDisabledTitle()}
            data-testid={RefineButtonTestIds.ShowButton}
            className={RefineButtonClassNames.ShowButton}
            {...rest}
        >
            <Link
                to={showUrl}
                replace={false}
                onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                    if (data?.can === false) {
                        e.preventDefault();
                        return;
                    }
                    if (onClick) {
                        e.preventDefault();
                        onClick(e);
                    }
                }}
            >
                <EyeIcon size={16} className="mr-2" />
                {!hideText && (children ?? translate("buttons.show", "Show"))}
            </Link>
        </Button>
    );
};
