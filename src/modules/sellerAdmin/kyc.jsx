import React from 'react'

export default function KYC() {
  return (
    <div className='w-full'>
          <div className='flex flex-col space-y-3'>
            <h5 className='text-black font-light text-sm'>Breeder/KYC</h5>
            
            <h5 className='text-xl font-semibold text-white'>Get verified!</h5>

          </div>
          
          <div className='w-full flex justify-center py-20'>
               <div className='w-4/5'>
                   <h5 className='text-xs font-semibold text-red-500'>Note: Complete the KNOW-YOUR-CUSTOMER requirements to <br></br> become a verified breeder/seller on Kennel Breeders</h5>
                   <div className='Flex flex-col py-10 space-y-4'>
                       <h5 className='flex space-x-1 items-center'>
                           <span className='font-semibold text-sm text-slate-700'>Send the documents below to</span>
                          <span className='font-semibold text-lg'>trevian_robinson@yahoo.com</span>
                     </h5>
                            <h5 className='text-sm text-slate-800 font-semibold'>1. Breeder's License or Certificate: Proof of legal permission to breed animals in the relevant jurisdiction.</h5>
                            <h5 className='text-sm text-slate-800 font-semibold'>2. Health Certifications: Documentation proving that breeding animals have been screened and cleared for genetic diseases, as well as vaccination records. "Per Animal Being Bred or Sold"</h5>
                            <h5 className='text-sm text-slate-800 font-semibold'>3. Sales Contracts: Sample contracts used for selling animals and their animal's insemination which outline the terms and conditions of the sale</h5> 
                            <h5 className='text-sm text-slate-800 font-semibold'>4. Kennel Registration: Proof of registration with relevant kennel clubs or breed associations. "Optional"</h5> 
                            <h5 className='text-sm text-slate-800 font-semibold'>5. Identification Documents: A valid form of identification (e.g., driver's license or government ID) to verify the breeder's identity. "Non-Optional"</h5> 
                            <h5 className='text-sm text-slate-800 font-semibold'>6. Facility Inspection Reports: Reports from any inspections conducted by local authorities or animal welfare organizations. "Optional"</h5> 
                            <h5 className='text-sm text-slate-800 font-semibold'>7. Breeding Records: Documentation of breeding practices, including the lineage of animals and records of previous litters. "Per Animal being Bred"</h5> 
                   </div>

                   <h5 className='text-xs font-bold text-black'>An admin will verify your documents and information, will take 3-5 working days then your account will be open for service</h5>

               </div>

          </div>

    </div>
  )
}
