import React from 'react'
import { FaRegBookmark,FaRegStar } from "react-icons/fa";


export default function Info() {
  return (
    <div className='flex flex-col w-full px-28 py-10'>
          <div className='flex items-center space-x-5'>
             <h5 className='font-semibold text-3xl'>Richard Willamson</h5>
             <FaRegBookmark 
                className='text-blue-600 text-xl'
             />
         </div>

         <div className='w-full py-4'>
             <p className='font-light text-slate-700 w-3/4'>Founded by a team of experienced breeders with a shared vision, PawsElite Kennels was born out of a genuine love for dogs and a desire to contribute positively to the world of responsible breeding. Our journey began with a simple yet profound goal: to produce exceptional puppies that embody the finest qualities of their respective breeds while promoting health, temperament, and companionship.</p>
         </div>

         <div className='flex flex-col w-full'>
              <h5 className='text-lg font-semibold'>Statistics</h5>
              <div className='flex items-center w-2/5 justify-between py-4'>
                  <div className='flex w-1/3 justify-between items-center'>
                     <h5 className='font-light'>Purchases</h5>
                     <h5 className='text-blue-600'>77</h5>

                  </div>
                  <div className='flex w-1/3 justify-between items-center'>
                     <h5 className='font-light'>Sales</h5>
                     <h5 className='text-blue-600'>102</h5>

                  </div>

              </div>
             
         </div>

    </div>
  )
}
