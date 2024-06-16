import { useContext, useEffect } from "react"
import { TableContext } from "../context/TableContext"
import '../styles/ToggleList.css'

export default function ToggleList()
{
    const {openToggleList,
           setCustomer,
           setEmail,
           setBirthDate,
           setAge,
           setWeight,
           setUniversity,
           customer,
           email,
           birthDate,
           age,
           weight,
           university
          }=useContext(TableContext)

    function toggleColumns(type)
    {
        switch(type){
            case 'customer':
                setCustomer(!customer)
            break;
            
            case 'email':
                setEmail(!email)
            break;

            case 'birthDate':
                setBirthDate(!birthDate)
            break;

            case 'age':
                setAge(!age)
            break;

            case 'weight':
                setWeight(!weight)
            break;

            case 'university':
                setUniversity(!university)
            break;

            default:
                break;
        }
    }

    return (
        <>
        {
            openToggleList?
            <div className="toggle-container py-3 px-5">
              
               <div className="p-3">
               <div className="flex gap-3 p-2">
                    <input type="checkbox" name="customer" id="customer" onChange={()=>toggleColumns('customer')}/>
                    <label for="customer">Customer</label>
                </div>
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="email" id="email" onChange={()=>toggleColumns('email')}/>
                <label for="email">Email</label>
                </div>
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="birthDate" id="birthDate" onChange={()=>toggleColumns('birthDate')}/>
                <label for="birthDate">Birth Date</label>
                </div>
               </div>

                <div className="p-3">
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="age" id="age" onChange={()=>toggleColumns('age')}/>
                <label for="age">Age</label>
                </div>
               <div className="flex gap-3 p-2">
                <input type="checkbox" name="weight" id="weight" onChange={()=>toggleColumns('weight')}/>
                <label for="weight">Weight</label>
                </div>
                <div className="flex gap-3 p-2">
                <input type="checkbox" name="university" id="university" onChange={()=>toggleColumns('university')}/>
                <label for="university">University</label>
                </div>
                </div>
            </div>
            :null
        }
        </>
    )
}