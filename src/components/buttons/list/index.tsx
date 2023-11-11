import {
    AccessControlContext,
    pickNotDeprecated,
    useCan,
    useNavigation,
    useResource,
    useTranslate,
    useUserFriendlyName,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import React, { useContext } from "react";

import { List } from "lucide-react";
import { Button, Link } from "../../../ui";
import { ListButtonProps } from "../types";

export const ListButton: React.FC<ListButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName: propResourceNameOrRouteName,
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

    const { listUrl: generateListUrl } = useNavigation();

    const translate = useTranslate();

    const { resource, identifier } = useResource(
        resourceNameFromProps ?? propResourceNameOrRouteName,
    );

    const getUserFriendlyName = useUserFriendlyName();

    const { data } = useCan({
        resource: resource?.name,
        action: "list",
        queryOptions: {
            enabled: accessControlEnabled,
        },
        params: {
            resource,
        },
    });

    const createButtonDisabledTitle = () => {
        if (data?.can) return "";
        else if (data?.reason) return data.reason;
        else
            return translate(
                "buttons.notAccessTitle",
                "You don't have permission to access",
            );
    };

    const listUrl = resource ? generateListUrl(resource, meta) : "";

    if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Button
            disabled={data?.can === false}
            asChild
            title={createButtonDisabledTitle()}
            data-testid={RefineButtonTestIds.ListButton}
            className={RefineButtonClassNames.ListButton}
            {...rest}
        >
            <Link
                to={listUrl}
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
                <List size={16} className="mr-2" />
                {!hideText &&
                    (children ??
                        translate(
                            `${
                                identifier ??
                                resourceNameFromProps ??
                                propResourceNameOrRouteName
                            }.titles.list`,
                            getUserFriendlyName(
                                resource?.meta?.label ??
                                    resource?.label ??
                                    identifier ??
                                    pickNotDeprecated(
                                        resourceNameFromProps,
                                        propResourceNameOrRouteName,
                                    ),
                                "plural",
                            ),
                        ))}
            </Link>
        </Button>
    );
};
