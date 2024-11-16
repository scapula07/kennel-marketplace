import React from 'react'
import { FaRegBookmark,FaRegStar } from "react-icons/fa";


export default function Info({seller}) {
  return (
    <div className='flex flex-col w-full md:px-28 px-4 md:py-10 py-4'>
          <div className='flex items-center space-x-5'>
             <h5 className='font-semibold text-3xl'>{seller?.name}</h5>
            
         </div>

         <div className='w-full py-4'>
             <p className='font-light text-slate-700 w-3/4'>{seller?.bio}</p>
         </div>
{/* 
         <div className='flex flex-col w-full'>
              <h5 className='text-lg font-semibold'>Statistics</h5>
              <div className='flex items-center w-2/5 justify-between py-4'>
                  <div className='flex w-1/3 justify-between items-center'>
                     <h5 className='font-light'>Purchases</h5>
                     <h5 className='text-blue-600'>{"0"}</h5>

                  </div>
                  <div className='flex w-1/3 justify-between items-center'>
                     <h5 className='font-light'>Sales</h5>
                     <h5 className='text-blue-600'>{"0"}</h5>

                  </div>

              </div>
             
         </div> */}

    </div>
  )
}
