import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const TableContext=createContext(null)

export const TableProvider=({children})=>{

    const [userData,setUserData]=useState([])
    const [loading, setLoading]=useState(true)
    const [openModal, setOpenModal]=useState(false)
    const [openToggleList, setOpenToggleList]=useState(false)
    const [customer,setCustomer]=useState(true)
    const [email,setEmail]=useState(true)
    const [birthDate,setBirthDate]=useState(true)
    const [age,setAge]=useState(true)
    const [weight,setWeight]=useState(true)
    const [university,setUniversity]=useState(true)
    const [fromWeight, setFromWeight]=useState(0)
    const [toWeight, setToWeight]=useState(0)
    const [birthDateFilter, setBirthDateFilter]=useState(0)
    const [ageFilter, setAgeFilter]=useState(0)
    const [resetUserData, setResetUserData]=useState([])
    const [openExport, setOpenExport]=useState(false)

    useEffect(()=>{
        axios.get(import.meta.env.VITE_USERDATA).then((res)=>{
            console.log("Res",res)
            setUserData(res.data.users)
            setResetUserData(res.data.users)
            setLoading(false)
        })
    },
    [])

    return (
        <TableContext.Provider value={{ 
            userData,
            setUserData,
            loading,
            setLoading,
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
            setUniversity,
            fromWeight,
            setFromWeight,
            ageFilter,
            setAgeFilter,
            toWeight,
            setToWeight,
            birthDateFilter,
            setBirthDateFilter,
            setResetUserData,
            resetUserData,
            openExport,
            setOpenExport
            }}>
            {children}
        </TableContext.Provider>
    )
}