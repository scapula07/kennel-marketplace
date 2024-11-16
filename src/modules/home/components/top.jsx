import React from 'react'
import comb from "../../../assets/comb.png"
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegBookmark,FaRegStar } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";

export default function TopProduct() {
  return (
    <div className='md:w-4/6 w-full px-4 md:px-0 md:py-20 flex flex-col '>
        <div className='flex md:flex-row flex-col w-full items-center md:justify-between space-y-6 md:space-y-0' >

                  <div className='flex flex-col space-y-2'>
                      <h5 className='text-4xl font-semibold'>Top selling products</h5>
                      <h5 className='text-slate-500  '>Want to pre-order favourite animal? Check upcoming litter drops</h5>

                  </div>
                  <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600 w-full md:w-28'>{"View all ->"}</button>

             </div>

               <div  className='grid grid-flow-row md:grid-cols-3 grid-cols-2  gap-4 gap-y-8 h-full w-full py-6'>
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
                      <h5 className='bg-white flex items-center p-2 rounded-full'>
                        {[1,2,3,4,5].map(()=>{
                          return(
                             <MdOutlineStar 
                               className='text-yellow-300 '
                             />
                          )
                        })

                        }

                      </h5>

                   </div>

             </div>

         </div>

         <div className='flex flex-col space-y-3'>
            <h5 className='text-slate-500 text-xl font-semibold'>Brush for dogs</h5>
            <h5 className='text-slate-400 text-sm '>Classic dog brush to take care or dog fur. Best for long haired dog breeds</h5>
            <h5 className=' text-2xl font-semibold'>12 USD</h5>

         </div>

         <div className='w-full'>
            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                 
                           <MdOutlineShoppingCart 
                                className='text-xl' 
                             />
                             <span>Add to cart</span>

            </button>
         </div>

     </div>
    )
}