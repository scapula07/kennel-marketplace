import React from 'react'

export default function Guide() {
  let number=0
  return (
    <div className='w-full h-full'>
              <div className='flex flex-col space-y-3'>
                <h5 className='text-black font-light text-sm'>Breeder/Guide</h5>
                
                <h5 className='text-xl font-semibold text-white'>Breeders Platform User Guide</h5>

            </div>

            <div className='w-full h-full flex flex-col py-14 space-y-4'>
                   {[
                      {
                        label:"Complete KYC Verification",
                        items:[
                          "Go to the 'Payment Method' section of your user profile.",
                          "Follow the steps on the KYC page to submit the required documents and credentials via email to the Admin.",
                          "Once verified, Admin will lift the restrictions on your account."
                        ]
                      },
                      {
                        label:"Set Up Stripe Connect Account",
                        items:[
                          "After creating a Breeder account, you must complete the KYC process.",
                          "Create a Stripe Connect account to receive payments from customers through the Kennel Breeder platform.",
            
                        ]
                      },
                      {
                        label:"Handling Orders and Contracts",
                        items:[
                          "All orders are accompanied by a contract sent to the buyer, outlining terms and conditions.",
                          "Kennel Breeder is not liable for any contract breaches between buyer and seller (e.g., payment, delivery).",
                          "Contract templates are attached to each order."
                        ]
                      },
                      {
                        label:"Create Shipments",
                        items:[
                          "Set up shipments to calculate real-time delivery rates with your chosen parcel provider.",
                   
                        ]
                      },
                      {
                        label:"Managing Litters & Pre-Orders",
                        items:[
                          "Litters and pre-orders will be saved in your “Saved” section.",
                          "When products become available, they will automatically transfer to your cart.",
            
                        ]
                      },
                     ]?.map((item)=>{
                       number++
                      return(
                          <div className='flex flex-col'>
                              <h5 className='font-bold text-sm'>{number}. {item?.label}</h5>
                              <ol className='px-2'>
                                 {item?.items?.map((detail)=>
                                      <li className='text-slate-800 font-light'>- {detail}</li>
                                 )

                                 }
                              
                              </ol>
                          </div>
                      )
                   })

                   }

            </div>

        
    </div>
  )
}
