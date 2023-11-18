import { useTranslate } from "@refinedev/core";
import { AlertTriangleIcon, Trash2 } from "lucide-react";

import { useCallback, useContext } from "react";
import type { RowActionProps } from ".";
import { RowAction } from ".";
import { useDeleteHelper, useOnBack } from "../../../hooks";
import { DeleteContext, DeleteContextType } from "../../../providers";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../ui";
import { ReloadIcon } from "@radix-ui/react-icons";

type DeleteActionProps = RowActionProps & {
    row: any;
    resource: string;
    title: string;
    withForceDelete?: boolean;
};

export function DeleteActionModal(props: DeleteContextType) {
    const back = useOnBack();
    const { can, isLoading, mutate } = useDeleteHelper(
        props.data?.resource,
        props.data?.row?.id,
    );

    const translate = useTranslate();

    const onDelete = useCallback(() => {
        if (can) {
            return mutate({
                onSuccess() {
                    const isRedirectBack = props?.data?.redirectBack ?? false;
                    props?.updateData({
                        toogle: false,
                        row: undefined,
                        resource: "",
                        redirectBack: false,
                    });

                    if (isRedirectBack) {
                        back?.();
                    }
                },
            });
        }

        return undefined;
    }, [mutate, can]);

    return (
        <Dialog
            open={can && props?.data?.toogle}
            onOpenChange={() => {
                if (!isLoading) {
                    props?.updateData({
                        toogle: false,
                        row: undefined,
                        resource: "",
                    });
                }
            }}
        >
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="inline-flex flex-row items-center gap-x-2">
                        <AlertTriangleIcon />
                        {translate(
                            "actions.delete.title",
                            "Are you sure absolutely sure?",
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {translate(
                            "actions.delete.title",
                            "If this action can be undone later, this data will be temporarily deleted.",
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <div className="flex flex-col sm:flex-row gap-x-3">
                        <DialogClose asChild>
                            <Button
                                disabled={isLoading}
                                type="button"
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={onDelete}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 size={16} className="mr-2" />
                            )}
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function DeleteAction({
    row,
    resource,
    title,
    disabled,
    withForceDelete,
    ...props
}: DeleteActionProps) {
    const { can, reason } = useDeleteHelper(resource, row.id);
    const deleteContext = useContext(DeleteContext);

    return (
        <RowAction
            {...props}
            disabled={!can ?? disabled}
            title={!can ? reason : title}
            onClick={() =>
                deleteContext?.updateData({
                    row,
                    resource,
                    toogle: true,
                })
            }
        />
    );
}

DeleteAction.displayName = "DeleteAction";
