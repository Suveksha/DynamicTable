import { useContext, useEffect } from "react"
import { TableContext } from "../context/TableContext"
import '../styles/ToggleList.css'

export default function ToggleList()
{
    const {openToggleList}=useContext(TableContext)

    return (
        <>
        {
            openToggleList?
            <div className="toggle-container py-3 px-5">
              
               <div className="p-3">
               <div className="flex gap-3 p-2">
                    <input type="checkbox" name="customer" id="customer"/>
                    <label for="customer">Customer</label>
                </div>
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="email" id="email"/>
                <label for="email">Email</label>
                </div>
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="birthDate" id="birthDate"/>
                <label for="birthDate">Birth Date</label>
                </div>
               </div>

                <div className="p-3">
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="age" id="age"/>
                <label for="age">Age</label>
                </div>
               <div className="flex gap-3 p-2">
                <input type="checkbox" name="weight" id="weight"/>
                <label for="weight">Weight</label>
                </div>
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="university" id="university"/>
                <label for="university">University</label>
                </div>
                </div>
            </div>
            :null
        }
        </>
    )
}