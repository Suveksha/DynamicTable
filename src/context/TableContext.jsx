import { createContext, useContext, useState } from "react";

export const TableContext=createContext(null)

export const TableProvider=({children})=>{

    const [openModal, setOpenModal]=useState(false)
    const [openToggleList, setOpenToggleList]=useState(false)
    const [customer,setCustomer]=useState(true)
    const [email,setEmail]=useState(true)
    const [birthDate,setBirthDate]=useState(true)
    const [age,setAge]=useState(true)
    const [weight,setWeight]=useState(true)
    const [university,setUniversity]=useState(true)


    return (
        <TableContext.Provider value={{ 
            openModal,
            setOpenModal,
            openToggleList,
            setOpenToggleList,
            customer,
            setCustomer,
            email,
            setEmail,
            birthDate,
            setBirthDate,
            age,
            setAge,
            weight,
            setWeight,
            university,
            setUniversity
            }}>
            {children}
        </TableContext.Provider>
    )
}