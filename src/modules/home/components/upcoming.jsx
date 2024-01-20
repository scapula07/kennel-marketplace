import React from 'react'
import comb from "../../../assets/comb.png"
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegBookmark,FaRegStar } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";

export default function Upcoming() {
  return (
    <div className='w-4/6  py-20 flex flex-col '>


           <div className='flex w-full items-center justify-between' >

                  <div className='flex flex-col space-y-2'>
                      <h5 className='text-6xl font-semibold'>Upcoming litter drops</h5>
                      <h5 className='text-slate-500  '>Want to pre-order favourite animal? Check upcoming litter drops</h5>

                  </div>
                  <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>{"View all ->"}</button>

             </div>


               <div  className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full py-6'>
                  {[1,2,3].map(()=>{
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
         <div className='relative h-72 w-full'>
             <img 
               src={comb}
               className="w-full h-full rounded-lg"

             />
             <div className='absolute top-0 z-30 w-full h-full'>
                   <div className='w-full h-full flex flex-col justify-between items-end px-4 py-2'>
                      <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full'>
                          <FaRegBookmark 
                          />

                      </h5>
                      <h5 className='bg-white flex items-center py-1.5 text-slate-700 font-semibold rounded-full px-4 text-xs' >
                         2 left

                      </h5>

                   </div>

             </div>

         </div>

         <div className='flex flex-col space-y-3'>
            <h5 className='text-slate-500 text-xl font-semibold'>Brush for dogs</h5>
            <h5 className='text-slate-400 text-sm '>Classic dog brush to take care or dog fur. Best for long haired dog breeds</h5>
            <div className='flex items-center justify-between'>
                <h5 className=' text-sm font-semibold'>
                  <span>Available</span>

                </h5>
                <h5 className=' text-sm font-semibold'>
                   1 week 4 days

                </h5>

            </div>
           

         </div>

         <div className='w-full'>
            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                 
                           <MdOutlineShoppingCart 
                                className='text-xl' 
                             />
                             <span>Pre-order</span>

            </button>
         </div>

     </div>
    )
}