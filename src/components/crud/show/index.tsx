import { DeleteProvider } from "@/providers";
import {
    useRefineContext,
    useResource,
    useTranslate,
    useUserFriendlyName,
} from "@refinedev/core";
import { ReactNode } from "react";
import { Breadcrumb, DeleteButton, EditButton, PageHeader } from "../..";
import { Card, CardContent } from "../../../ui";
import { ListProps } from "../types";
import { Row } from "./components/row";

export const Show = ({
    title,
    resource: resourceFromProps,
    breadcrumb: breadcrumbFromProps,
    extra,
    children,
}: ListProps) => {
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const getUserFriendlyName = useUserFriendlyName();

    const { resource, identifier } = useResource(resourceFromProps);

    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? globalBreadcrumb
            : breadcrumbFromProps;

    return (
        <DeleteProvider>
            <PageHeader
                title={
                    title ??
                    translate(
                        `${identifier}.titles.List`,
                        `Show ${getUserFriendlyName(
                            resource?.meta?.label ??
                            resource?.options?.label ??
                            resource?.label ??
                            identifier,
                            "singular",
                        )}`,
                    )
                }
                breadcrumb={
                    typeof breadcrumb !== "undefined" ? (
                        <>{breadcrumb}</> ?? undefined
                    ) : (
                        <Breadcrumb />
                    )
                }
                isBack
                extra={
                    extra ?? <div className="inline-flex items-center gap-x-2">
                        <EditButton resource={resourceFromProps} />
                        <DeleteButton resource={resourceFromProps} />
                    </div>
                }
            />
            <div className="relative pt-4 !mt-0">
                <Card>
                    <CardContent>{children as ReactNode}</CardContent>
                </Card>
            </div>
        </DeleteProvider>
    );
};

Show.Row = Row;
