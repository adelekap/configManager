import React, {useState, createContext} from "react"

import { dataSource } from "../../data/settings";

const initialState = dataSource

export const TableContext = createContext();

export const TableContextProvider = ({children}) => {
    const [tableState, setState] = useState(initialState);

    const addCell = () => {
        const index = tableState[tableState.length-1].dataIndex + 1
        const data = {dataIndex: index,
                        scope: "",
                        setting:"",
                        value:"ADD VALUE"}

        const newState = [...tableState,data]
        
        setState(newState)
        
    }

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
        <TableContext.Provider value={{tableState, updateCell, addCell}}>
            {children}
        </TableContext.Provider>
    )
}