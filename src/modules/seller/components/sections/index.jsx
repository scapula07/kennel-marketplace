import React from 'react'

export default function Sections() {
  return (
      <div className='py-4 flex flex-col w-full px-28'>
           <div className='w-full'>
                <div className='border rounded-full flex items-center w-3/5 justify-between '>
                    <button className='rounded-full py-3 bg-green-900 px-6 text-white text-sm'>Home</button>
                    <button className='rounded-full py-3  px-6  text-sm'>Products</button>
                    <button className='rounded-full py-3  px-6  text-sm'>Services</button>
                    <button className='rounded-full py-3  px-6  text-sm'>Seller Information</button>
                    <button className='rounded-full py-3  px-6  text-sm'>Payment & Delivery</button>

                </div>

           </div>
            
          

      </div>
  )
}
