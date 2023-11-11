import { useTranslate } from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import React from "react";

import { Save } from "lucide-react";
import { Button } from "../../../ui";
import { SaveButtonProps } from "../types";
import { ReloadIcon } from "@radix-ui/react-icons";

export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    children,
    loading,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <Button
            data-testid={RefineButtonTestIds.SaveButton}
            className={RefineButtonClassNames.SaveButton}
            size={hideText ? "icon" : rest.size ?? "default"}
            {...rest}
        >
            {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Save className="mr-2" size={16} />
            )}
            {!hideText && (children ?? translate("buttons.save", "Save"))}
        </Button>
    );
};
