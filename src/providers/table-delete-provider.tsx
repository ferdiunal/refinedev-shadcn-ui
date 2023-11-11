import React, { PropsWithChildren, createContext, useState } from "react";
import { DeleteActionModal } from "../components/table/actions/delete";

type TableDeleteDataType = {
    toogle: boolean;
    row: any;
    resource: string;
};

export interface TableDeleteContextType {
    data: TableDeleteDataType;
    updateData: (data: TableDeleteDataType) => void;
}

const TableDeleteContext = createContext<TableDeleteContextType | undefined>(
    undefined,
);

// Provider bileşeni
const TableDeleteProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<TableDeleteDataType>({
        row: undefined,
        resource: "",
        toogle: false,
    });

    const updateData = (data: TableDeleteDataType) => {
        setData(data);
    };

    return (
        <TableDeleteContext.Provider value={{ data, updateData }}>
            {children}
            <DeleteActionModal
                data={data as TableDeleteDataType}
                updateData={updateData}
            />
        </TableDeleteContext.Provider>
    );
};

export { TableDeleteContext, TableDeleteProvider };
