import { createContext, useContext, useState } from "react";

export const TableContext=createContext(null)

export const TableProvider=({children})=>{

    const [openModal, setOpenModal]=useState(false)
    const [openToggleList, setOpenToggleList]=useState(false)

    return (
        <TableContext.Provider value={{ openModal, setOpenModal, openToggleList, setOpenToggleList }}>
            {children}
        </TableContext.Provider>
    )
}