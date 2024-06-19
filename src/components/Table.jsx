import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import '../styles/Table.css'
import {TableContext} from '../context/TableContext'

export default function Table()
{
    const {
        userData,
        resetUserData,
        setUserData,
        loading,
        setLoading,
        setOpenModal,
        setOpenToggleList,
        openToggleList,
        customer,
        email,
        birthDate,
        weight,
        age,
        university,
        setOpenExport,
        openExport
        }=useContext(TableContext)


    function clickModal()
    {
        setOpenModal(true)
        setOpenToggleList(false)
        setOpenExport(false)
        console.log("Open Modal")
    }

    function openExportModal()
    {
        setOpenExport(!openExport)
    }

    function toggleCheckBox(type)
    {
        if(openToggleList && type=='table')
        {
            setOpenToggleList(false)
            console.log("Toggle list Closed from Table click")
        }
        else if(openToggleList && type=='button')
            {
                setOpenToggleList(false)
                console.log("Toggle list Open from button click")
            }
        else if(type=="button")
       { 
        setOpenToggleList(true)
        setOpenExport(false)
        console.log("Toggle list Opened from button click")
        }
    }

    function closeExportMenu(type)
    {
        if(type=='table' && openExport)
            {
                setOpenExport(false)
            }
    }

    function searchUserData(event)
    {

        console.log("Event in Function", event.target.value);
        let searchData = userData;

        const columns = ['firstName', 'lastName', 'email', 'birthDate', 'weight', 'university'];
    
        const searchValue = event.target.value.toLowerCase().trim();
        

        if(!searchValue)
            setUserData(resetUserData)

        else
        {
            searchData = searchData.filter((user) => {
                return columns.some((col) => {
                    const userValue = user[col] ? user[col].toString().toLowerCase() : '';
                    return userValue.includes(searchValue);
                }) || (user['firstName'] + " " + user['lastName']).toLowerCase().includes(searchValue);
            });
            
            
                setUserData(searchData);
        }
    }

    const [sortedData,setSortedData]=useState()
    const [sortCustomerType,setCustomerSortType]=useState('desc')
    const [sortEmailType,setEmailSortType]=useState('desc')
    const [sortAgeType,setAgeSortType]=useState('desc')
    const [sortWeightType,setWeightSortType]=useState('desc')
    const [sortUniversityType,setUniversitySortType]=useState('desc')
    const [sortBirthDateType, setBirthDateSortType]=useState('desc')


    function sortColumn(colName, type)
    {
        let sortUserData=userData

        switch(colName){
            case 'customer':
                if(type=='asc')
                    {
                        setCustomerSortType('desc')
                        sortUserData.sort((a, b) => {
                            let nameA = a.firstName.toLowerCase();
                            let nameB = b.firstName.toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                    else if (type === 'desc') {
                        setCustomerSortType('asc')
                        sortUserData.sort((a, b) => {
                            let nameA = a.firstName.toLowerCase();
                            let nameB = b.firstName.toLowerCase();
                            if (nameA > nameB) {
                                return -1;
                            }
                            if (nameA < nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    }

                    break;

                case 'email':
                    if(type=='asc')
                        {
                            setEmailSortType('desc')
                            sortUserData.sort((a, b) => {
                                let nameA = a.email.toLowerCase();
                                let nameB = b.email.toLowerCase();
                                if (nameA < nameB) {
                                    return -1;
                                }
                                if (nameA > nameB) {
                                    return 1;
                                }
                                return 0;
                            });
                        }
                        else if (type === 'desc') {
                            setEmailSortType('asc')
                            sortUserData.sort((a, b) => {
                                let nameA = a.email.toLowerCase();
                                let nameB = b.email.toLowerCase();
                                if (nameA > nameB) {
                                    return -1;
                                }
                                if (nameA < nameB) {
                                    return 1;
                                }
                                return 0;
                            });
                        }
                        break;

                case 'age':
                    if(type=='asc')
                        {
                            setAgeSortType('desc')
                            sortUserData.sort((a,b)=>Number(a.age)-Number(b.age))
                        }
                        else
                        {
                            setAgeSortType('asc')
                            sortUserData.sort((a,b)=>Number(b.age)-Number(a.age))
                        }
                    break;

                case 'weight':
                    if(type=='asc')
                        {
                            setWeightSortType('desc')
                            sortUserData.sort((a,b)=>Number(a.weight)-Number(b.weight))
                        }
                        else
                        {
                            setWeightSortType('asc')
                            sortUserData.sort((a,b)=>Number(b.weight)-Number(a.weight))
                        }
                    break;
                
                
                case 'university':
                    if(type=='asc')
                        {
                            setUniversitySortType('desc')
                            sortUserData.sort((a, b) => {
                                let nameA = a.university.toLowerCase();
                                let nameB = b.university.toLowerCase();
                                if (nameA < nameB) {
                                    return -1;
                                }
                                if (nameA > nameB) {
                                    return 1;
                                }
                                return 0;
                            });
                        }
                        else if (type === 'desc') {
                            setUniversitySortType('asc')
                            sortUserData.sort((a, b) => {
                                let nameA = a.university.toLowerCase();
                                let nameB = b.university.toLowerCase();
                                if (nameA > nameB) {
                                    return -1;
                                }
                                if (nameA < nameB) {
                                    return 1;
                                }
                                return 0;
                            });
                        }

                        break;
                    

                case 'birthDate':
                    
                    if(type=='asc')
                    {
                        setBirthDateSortType('desc')
                        sortUserData.sort((a,b)=>{
                            let dobA=new Date(a.birthDate)
                            let dobB=new Date(b.birthDate)
                            return dobA-dobB
                        })
                    }
                    
                    else if(type=='desc')
                    {
                        setBirthDateSortType('asc')
                        sortUserData.sort((a,b)=>{
                            let dobA=new Date(a.birthDate)
                            let dobB=new Date(b.birthDate)
                            return dobB-dobA
                        })
                    }

                    break;

                default:
                    console.log("Default")
        }

        console.log("Sorted UserData",sortUserData)
       setSortedData(sortUserData)
    }

    useEffect(()=>{
        setUserData(sortedData)

    },[sortedData])
    
    return (
        <>
        {
        loading?
        <div>
           <svg className="animate-spin" data-name="Layer 1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,7a1,1,0,1,0,1,1A1,1,0,0,0,12,7ZM6.30383,16.134a1,1,0,1,0,1.366.366A1,1,0,0,0,6.30383,16.134Zm11.39234,0a1,1,0,1,0,.366,1.366A.99992.99992,0,0,0,17.69617,16.134Zm2.91418-2.7912v-.00048a4.91843,4.91843,0,0,0-4.52588-1.19678L15.665,11.3833a4.98871,4.98871,0,0,0-2.50342-8.25146,5.03485,5.03485,0,0,0-4.27832.958A4.97824,4.97824,0,0,0,7,8a4.92853,4.92853,0,0,0,1.35156,3.3916l-.41845.75a4.9889,4.9889,0,0,0-5.92627,6.28613,5.02991,5.02991,0,0,0,2.96972,3.22608,4.96944,4.96944,0,0,0,6.58887-3.18994l.8667.01416a4.98119,4.98119,0,0,0,4.76025,3.52441,5.01726,5.01726,0,0,0,4.79981-3.57373A4.95006,4.95006,0,0,0,20.61035,13.34277Zm-.52881,4.49512a3.0059,3.0059,0,0,1-4.38574,1.75977,2.96456,2.96456,0,0,1-1.35156-1.70508,1.99436,1.99436,0,0,0-1.90967-1.42871h-.86914a1.99451,1.99451,0,0,0-1.90967,1.42822A2.98084,2.98084,0,0,1,5.70654,19.792a2.99293,2.99293,0,0,1,1.76709-5.7041,1.96659,1.96659,0,0,0,2.17383-.94238l.43555-.75342a1.99513,1.99513,0,0,0-.28125-2.36865,2.9795,2.9795,0,0,1,.3291-4.37012A2.99279,2.99279,0,0,1,14.19971,10.022a2.00015,2.00015,0,0,0-.28272,2.37012l.43506.75293a1.97369,1.97369,0,0,0,2.17432.94336,2.98771,2.98771,0,0,1,3.55517,3.74951Z" fill="#6563ff"/></svg>
            Loading
        </div> :
        <div onClick={()=>{toggleCheckBox('table');closeExportMenu('table')}} className="container">
           <div className="flex mb-5 top-bar">
           <input type="text" placeholder="Search by anything..." className="block focus:outline-none rounded-md border-0 h-11 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" onChange={(event)=>searchUserData(event)}/>
           <div className="flex gap-5">
           <button className="focus:outline-none flex gap-2 hover:border-gray-400" onClick={()=>clickModal()}>
           <svg width="1.5rem" enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z" fill="none" id="XMLID_6_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
            Filters
            </button>

            <button className="focus:outline-none flex gap-2 hover:border-gray-400" onClick={()=>openExportModal()}>
            <svg class="icon icon-tabler icon-tabler-file-export" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"/></svg>
            Export
            </button>

           <button className="focus:outline-none hover:border-gray-400" onClick={()=>toggleCheckBox('button')}>
           <svg height="25px" version="1.1" viewBox="0 0 25 25" width="25px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="TabBar-Icons" stroke="none" stroke-width="1"><g fill="#000000" id="Hamburger-Round"><path d="M0,4 C0,2.8954305 0.889763236,2 2.00359486,2 L22.9964051,2 C24.10296,2 25,2.88772964 25,4 C25,5.1045695 24.1102368,6 22.9964051,6 L2.00359486,6 C0.897039974,6 0,5.11227036 0,4 L0,4 Z M0,12 C0,10.8954305 0.889763236,10 2.00359486,10 L22.9964051,10 C24.10296,10 25,10.8877296 25,12 C25,13.1045695 24.1102368,14 22.9964051,14 L2.00359486,14 C0.897039974,14 0,13.1122704 0,12 L0,12 Z M0,20 C0,18.8954305 0.889763236,18 2.00359486,18 L22.9964051,18 C24.10296,18 25,18.8877296 25,20 C25,21.1045695 24.1102368,22 22.9964051,22 L2.00359486,22 C0.897039974,22 0,21.1122704 0,20 L0,20 Z" id="Hamburger"/></g></g></svg>
            </button>
           </div>
           </div>
           {
            customer || email || birthDate || age || weight || university ?
           <div>
             <table className="border-slate-100 border-2 cursor-pointer">
            <thead>
            <tr className="border-slate-100 border-2 text-slate-400 header-row">
                <th className="p-2 items-center" style={{display: customer ?'':'none'}}>
                    <div className="justify-center ap-2" style={{display: customer ?'flex':'none'}}>
                    Customer 
        
                    <div style={{display:sortCustomerType=='desc'?'block':'none'}} onClick={()=>{sortColumn('customer','desc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="backbord"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_up"><polygon points="30,22 16.001,8 2.001,22  "/></g></svg></div>
                    <div style={{display:sortCustomerType=='asc'?'block':'none'}} onClick={()=>{sortColumn('customer','asc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_down"><polygon points="2.002,10 16.001,24 30.002,10  "/></g></svg></div>
      
                    </div>
                    </th>
                <th className="p-2 items-center" style={{display: email?'':'none'}}>
                    <div className="justify-center gap-2" style={{display: email?'flex':'none'}}>
                    Email
                
                    <div style={{display:sortEmailType=='desc'?'block':'none'}} onClick={()=>{sortColumn('email','desc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="backbord"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_up"><polygon points="30,22 16.001,8 2.001,22  "/></g></svg></div>
                    <div style={{display:sortEmailType=='asc'?'block':'none'}} onClick={()=>{sortColumn('email','asc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_down"><polygon points="2.002,10 16.001,24 30.002,10  "/></g></svg></div>
               
                    </div>
                </th>
                <th className="p-2 items-center" style={{display: birthDate?'':'none'}}>
                    <div className="justify-center gap-2" style={{display: birthDate?'flex':'none'}}>
                    Birth&nbsp;Date

                    <div style={{display:sortBirthDateType=='desc'?'block':'none'}} onClick={()=>{sortColumn('birthDate','desc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="backbord"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_up"><polygon points="30,22 16.001,8 2.001,22  "/></g></svg></div>
                    <div style={{display:sortBirthDateType=='asc'?'block':'none'}} onClick={()=>{sortColumn('birthDate','asc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_down"><polygon points="2.002,10 16.001,24 30.002,10  "/></g></svg></div>

                    </div>
                </th>
                <th className="p-2 items-center" style={{display: age?'':'none'}}>
                    <div className="justify-center gap-2" style={{display: age?'flex':'none'}}>
                    Age&nbsp;(years)
                    <div style={{display:sortAgeType=='desc'?'block':'none'}} onClick={()=>{sortColumn('age','desc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="backbord"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_up"><polygon points="30,22 16.001,8 2.001,22  "/></g></svg></div>
                    <div style={{display:sortAgeType=='asc'?'block':'none'}} onClick={()=>{sortColumn('age','asc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_down"><polygon points="2.002,10 16.001,24 30.002,10  "/></g></svg></div>
                    </div>
                </th>
                <th className="p-2 items-center" style={{display: weight?'':'none'}}>
                    <div className="justify-center gap-2" style={{display: weight?'flex':'none'}}>
                    Weight&nbsp;(kg)
                    <div style={{display:sortWeightType=='desc'?'block':'none'}} onClick={()=>{sortColumn('weight','desc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="backbord"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_up"><polygon points="30,22 16.001,8 2.001,22  "/></g></svg></div>
                    <div style={{display:sortWeightType=='asc'?'block':'none'}} onClick={()=>{sortColumn('weight','asc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_down"><polygon points="2.002,10 16.001,24 30.002,10  "/></g></svg></div>
                    </div>
                </th>
                <th className="p-2"  style={{display: university?'':'none'}}>
                    <div className="justify-center gap-2" style={{display: university?'flex':'none'}}>
                    University
                    <div style={{display:sortUniversityType=='desc'?'block':'none'}} onClick={()=>{sortColumn('university','desc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="backbord"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_up"><polygon points="30,22 16.001,8 2.001,22  "/></g></svg></div>
                    <div style={{display:sortUniversityType=='asc'?'block':'none'}} onClick={()=>{sortColumn('university','asc')}}><svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="arrow_x5F_down"><polygon points="2.002,10 16.001,24 30.002,10  "/></g></svg></div>
                    </div>
                </th>
                </tr>
            </thead>
           {
            userData.map((user)=>(
                <tr className="border-1 border-slate-100 border-2" key={user.id}>
                    <td className=" items-center px-1" style={{display: customer?'flex':'none'}}>
                        <img src={user.image} className="profile_image"/>
                        {user.firstName+" "+user.lastName}
                    </td>
                    <td className="px-2" style={{display: email?'':'none'}}>{user.email}</td>
                    <td className="px-2" style={{display: birthDate?'':'none'}}>{user.birthDate}</td>
                    <td className="px-2" style={{display: age?'':'none'}}>{user.age}</td>
                    <td className="px-2" style={{display: weight?'':'none'}}>{user.weight}</td>
                    <td className="px-2" style={{display: university?'':'none'}}>{user.university}</td>
                </tr>
            ))
           }
            </table>
              <div className="text-right mt-2 text-sm">Rows: {userData.length}</div>
            </div>
            : <div className="h-full w-full font-bold text-slate-400">No columns to display!</div>
            }
        </div>
        }
        </>
    )
}