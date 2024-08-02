import React from 'react'

export default function KYC() {
  return (
    <div className='w-full'>
          <div className='flex flex-col space-y-3'>
            <h5 className='text-black font-light text-sm'>Breeder/KYC</h5>
            
            <h5 className='text-xl font-semibold text-white'>Get verified!</h5>

          </div>
          
          <div className='w-full flex justify-center py-20'>
               <div className='w-3/5'>
                   <h5 className='text-xs font-semibold text-red-500'>Note: Complete the KNOW-YOUR-CUSTOMER requirements to <br></br> become a verified breeder/seller on Kennel Breeders</h5>
                   <div className='Flex flex-col py-10 space-y-4'>
                       <h5 className='flex space-x-1 items-center'>
                           <span className='font-semibold text-sm text-slate-700'>Send the documents below to</span>
                          <span className='font-semibold text-lg'>trevian_robinson@yahoo.com</span>
                     </h5>
                     <h5 className='text-sm text-slate-600'>1. Identification card</h5>
                     <h5 className='text-sm text-slate-600'>2. Breeding certfication</h5>

                   </div>

                   <h5 className='text-xs font-bold text-black'>An admin will verify your documents and information, will take 3-5 working days then your account will be open for service</h5>

               </div>

          </div>

    </div>
  )
}
