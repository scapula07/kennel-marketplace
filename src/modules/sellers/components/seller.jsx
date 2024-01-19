import React from 'react'
import { MdOutlineStar } from "react-icons/md";
import breeder from "../../../assets/breeder2.png"
import { MdOutlineShoppingCart } from "react-icons/md";


export default function Seller() {
  return (
    <div className='w-full'>
         
         <div  className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full py-6'>
                  {[1,2,3,4,5,6,7,8,9].map(()=>{
                      return(
                         <Card />
                       )
                  })}


         </div>

    </div>
  )
}





const Card=()=>{
  return(
    <div className='flex flex-col w-full space-y-4'>
        <div className=' w-full flex flex-col items-center space-y-3'>
            <img 
              src={breeder}
              className="rounded-full w-56 h-56"

            />

        <div className='flex flex-col space-y-2 items-center'>
           <h5 className='text-slate-500 text-xl font-semibold'>Samuel Richardson</h5>
         
              <h5 className=' text-lg text-slate-500 '>Dog breeder</h5>
         
          

         </div>

            



        </div>

        
        <div className='w-full flex justify-center py-6'>
        <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                  
                  <MdOutlineShoppingCart 
                       className='text-xl' 
                    />
                    <span>View profile</span>

   </button>
        </div>

    </div>
   )
}
