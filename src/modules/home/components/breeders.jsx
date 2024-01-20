import React from 'react'
import { MdOutlineStar } from "react-icons/md";

import breeder from "../../../assets/breeder.png"

export default function Breeders() {
  return (
    <div className='w-4/6  py-20 flex flex-col '>


           <div className='flex w-full items-center justify-between' >

                  <div className='flex flex-col space-y-2'>
                      <h5 className='text-6xl font-semibold'>Top breeders</h5>
                      <h5 className='text-slate-500  '>Check out the best breeders who work on Kennel Breeders</h5>

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
          <div className=' w-full flex flex-col items-center space-y-3'>
              <img 
                src={breeder}
                className="rounded-full"
 
              />

          <div className='flex flex-col space-y-2 items-center'>
             <h5 className='text-slate-500 text-xl font-semibold'>Samuel Richardson</h5>
             <h5 className=' flex items-center rounded-full'>
                    {[1,2,3,4,5].map(()=>{
                    return(
                        <MdOutlineStar 
                        className='text-yellow-300 '
                        />
                    )
                    })

                    }

                </h5>
                <h5 className=' text-lg text-slate-500 '>Dog breeder</h5>
                <h5 className='text-slate-400 text-sm text-center '>Top breeder from 2010. Award winnings dogs. Trusted by over 1000 customers</h5>
            
 
           </div>
 
              

 
 
          </div>
 
          
          <div className='w-full flex justify-center py-6'>
             <button className='text-white py-1.5 px-4 rounded-lg ' style={{background:"#C74A1F"}}>
                 View profile
 
             </button>
          </div>
 
      </div>
     )
 }
