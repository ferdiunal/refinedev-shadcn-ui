import React, { PropsWithChildren, createContext, useState } from "react";
import { DeleteActionModal } from "../components/table/actions/delete";

type DeleteDataType = {
    toogle: boolean;
    row: any;
    resource: string;
    redirectBack?: boolean;
};

export interface DeleteContextType {
    data: DeleteDataType;
    updateData: (data: DeleteDataType) => void;
}

const DeleteContext = createContext<DeleteContextType | undefined>(undefined);

const DeleteProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<DeleteDataType>({
        row: undefined,
        resource: "",
        toogle: false,
    });

    const updateData = (data: DeleteDataType) => {
        setData(data);
    };

    return (
        <DeleteContext.Provider value={{ data, updateData }}>
            {children}
            <DeleteActionModal
                data={data as DeleteDataType}
                updateData={updateData}
            />
        </DeleteContext.Provider>
    );
};

export { DeleteContext, DeleteProvider };
