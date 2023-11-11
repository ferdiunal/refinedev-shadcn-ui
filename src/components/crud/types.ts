import {
    RefineCrudCreateProps,
    RefineCrudEditProps,
    RefineCrudListProps,
    RefineCrudShowProps,
} from "@refinedev/ui-types";

import { PageHeaderProps } from "../pageHeader/type";

export type CreateProps = RefineCrudCreateProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps
>;

export type EditProps = RefineCrudEditProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps
>;

export type ListProps = RefineCrudListProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps,
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
>;

export type ShowProps = RefineCrudShowProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps
>;
