import { useContext, useEffect, useState } from "react"
import { TableContext } from "../context/TableContext"
import '../styles/Modal.css'
import axios from "axios"

export default function Modal(){

    const {
        userData,
        setUserData,
        openModal,
        setOpenModal,
        setFromWeight,
        setToWeight,
        fromWeight,
        toWeight,
        setBirthDateFilter,
        setAgeFilter,
        birthDateFilter,
        ageFilter,
        }=useContext(TableContext)


    const [fromWeightError, setFromWeightError]=useState(false)
    const [toWeightError, setToWeightError]=useState(false)
    const [ageError,setAgeError]=useState(false)
    const [clearFilter, setClearFilter]=useState(false)

    useEffect(()=>{
        axios.get(import.meta.env.VITE_USERDATA).then((res)=>{
            console.log("Res",res)
            setUserData(res.data.users)
            setClearFilter(false)
            setAgeError(false)
            setToWeightError(false)
            setFromWeightError(false)
        })
    },[clearFilter])

    function closeModal()
    {
        setOpenModal(false)
    }

    function showResults()
    {
        checkForNegativeNumber()
        // if(fromWeightError || toWeightError || ageError)
        //     return ;

        console.log("Weight From", fromWeight, "Weight To", toWeight)
        console.log("BirthDate",new Date(birthDateFilter).getTime())
        console.log("Age",ageFilter)

        console.log("UserData",userData)

        let filteredData=userData

        if(fromWeight && toWeight && fromWeight>=0 && toWeight>=0)
            {
                
                filteredData=filteredData.filter((user)=>{
                    console.log("Weight",typeof(user.weight),typeof(Number(fromWeight)))
                    return  Number(user.weight)>=Number(fromWeight) && Number(user.weight)<=Number(toWeight)
                })
                console.log("Weight FilteredData",filteredData)
            }
        
        if(ageFilter && Number(ageFilter)>=0)
            {
                filteredData=filteredData.filter((user)=>{
                    console.log("Age",typeof(user.age),typeof(Number(ageFilter)))
                    return Number(user.age)==Number(ageFilter)
                })
                console.log("Age FilteredData",filteredData)
            }

        if(birthDateFilter)
            {
                filteredData=filteredData.filter((user)=>{
                    let userDataDate=new Date(user.birthDate)
                    let filterDate=new Date(birthDateFilter)
                    return userDataDate.getFullYear()==filterDate.getFullYear() &&
                     userDataDate.getMonth()==filterDate.getMonth() &&
                      userDataDate.getDate()==filterDate.getDate()
                })

                console.log("BirthDate FilteredData",filteredData)

            }

        console.log("Filtered Data",filteredData)
        setUserData(filteredData)
        
    }

    function clearFilters()
    {
        document.getElementById('fromWeight').value=''
        document.getElementById('toWeight').value=''
        document.getElementById('birthDate').value=''
        document.getElementById('age').value=''
        setFromWeight('')
        setToWeight('')
        setBirthDateFilter('')
        setAgeFilter('')
        setClearFilter(true)
    }

    function checkForNegativeNumber()
    {
        if(fromWeight<0)
            setFromWeightError(true)
        
        if(toWeight<0)
            setToWeightError(true)

        if(ageFilter<0)
            setAgeError(true)
     
        if(fromWeight>=0)
            setFromWeightError(false)

        if(toWeight>=0)
            {
                console.log("To Weight > 0", toWeight, fromWeight)
                if(Number(toWeight)<Number(fromWeight))
                    {
                        console.log("Error To Weight < From Weight")
                        setToWeightError(true)
                    }
                
                else
                {
                    console.log("No Error To Weight > From Weight")
                    setToWeightError(false)
                }
            }

        if(ageFilter>=0)
            setAgeError(false)
        
    }

    return (
        <>
        {
            openModal?
            <div className="modal-backdrop">
                <div className="modal-container">
                    <div className="modal-header">
                       <div> Table Filters</div>
                       <div className="svg-wrapper" onClick={()=>closeModal()}>
                       <svg height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)"><g id="close" transform="translate(341.000000, 89.000000)"><path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" id="Shape"/></g></g></g></svg>
                       </div>
                    </div>
                    <div className="modal-body mt-5">
                        <div className="flex flex-col">
                            <div className="font-bold w-full text-left">Weight</div>
                           <div className="flex gap-5">
                           <div className="w-3/5">
                           <input type="number" min={0} className="focus:outline-none rounded-md border-0 h-11 py-1.5 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" onChange={(event)=>{setFromWeight(event.target.value)}} id="fromWeight"/>
                           <div className="text-red-400 text-left text-sm" style={{display : fromWeightError?'block':'none'}}>Invalid Input</div>
                           </div>

                           <div className="w-3/5">
                           <input type="number" min={0} className="focus:outline-none rounded-md border-0 h-11 py-1.5 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" onChange={(event)=>{setToWeight(event.target.value)}} id="toWeight"/>
                           <div className="text-red-400 text-left text-sm" style={{display : toWeightError?'block':'none'}}>Invalid Input</div>
                           </div>
                           </div>
                        </div>
                        <div className="flex flex-col mt-3">
                        <div className="font-bold w-full text-left">Birth Date</div>
                        <div>
                        <input type="date" className="w-full focus:outline-none rounded-md border-0 h-11 py-1.5 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" onChange={(event)=>{setBirthDateFilter(event.target.value)}} id="birthDate"/>
                        </div>
                        </div>
                        <div className="flex flex-col mt-3">
                        <div className="font-bold w-full text-left">Age&nbsp;(years)</div>
                        <div>
                        <input type="number" className="w-full focus:outline-none rounded-md border-0 h-11 py-1.5 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" onChange={(event)=>{setAgeFilter(event.target.value)}} id="age"/>
                        <div className="text-red-400 text-left text-sm" style={{display : ageError?'block':'none'}}>Invalid Input</div>
                        </div>
                        </div>
                        <div className="mt-4 clear-btn">
                            <button className="w-full font-bold bg-red-400 flex justify-center gap-2 hover:bg-red-500 hover:border-red-500 text-white focus:outline-none" onClick={()=>clearFilters()}>
                            <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title/><path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"/><path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"/><path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"/><path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"/><path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"/><path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"/></svg>
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button className="w-full bg-green-400 text-white font-bold hover:bg-green-500 focus:outline-none hover:border-green-500" onClick={()=>{showResults()}}>Show Results</button>
                    </div>
                </div>
            </div>
            :null
        }
        </>
    )
}