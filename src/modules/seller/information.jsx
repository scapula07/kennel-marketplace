import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
export default function Information() {
  const [seller]= useOutletContext();
  return (
    <div className='py-8'>
          <h5 className='text-4xl font-semibold'>Seller information</h5>
          <div className='flex flex-col space-y-2 py-4'>
             <h5 className='flex items-center space-x-2'>
                <IoMailOutline 
                  className='text-2xl'
                />
                <span>{seller?.email}</span>
              </h5>
              <h5 className='flex items-center space-x-2'>
                <IoLocationOutline
                  className='text-2xl'
                 />
                <span>{seller?.address}</span>
              </h5>
            
                {seller?.tags?.map((tag)=>
                  <li>{tag?.value}</li>
                  )

                }

  
        
             
          </div>
    </div>
  )
}
