import React, {useState, createContext} from "react"

import { dataSource } from "../../data/settings";

const initialState = dataSource

export const TableContext = createContext();

export const TableContextProvider = ({children}) => {
    const [tableState, setState] = useState(initialState);

    const updateCell = (columnName, rowNumber, newValue) => {
        const newState = tableState.map((value, index)=> {
            if(index === rowNumber){
                const newRow = {...value, [columnName]:newValue}
                return newRow
            }
            return value
        })

        setState(newState)
    }

    return (
        <TableContext.Provider value={{tableState, updateCell}}>
            {children}
        </TableContext.Provider>
    )
}