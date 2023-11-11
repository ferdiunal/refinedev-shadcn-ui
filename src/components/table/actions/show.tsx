import type { RowActionProps } from ".";
import { RowAction } from ".";
import { useGetShowUrl } from "../../../hooks";

type ShowActionProps = RowActionProps & {
    row: any;
    resource: string;
    title: string;
};

export function ShowAction({
    row,
    resource,
    title,
    disabled,
    ...props
}: ShowActionProps) {
    const edit = useGetShowUrl(resource, row.id);

    return (
        <RowAction
            {...props}
            disabled={!edit.can ?? disabled}
            title={!edit?.can ? edit?.reason : title}
            to={edit.url}
        />
    );
}

ShowAction.displayName = "ShowAction";
