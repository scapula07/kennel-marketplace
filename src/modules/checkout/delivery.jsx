import React from 'react'

export default function Delivery() {
  return (
    <div className='w-full flex flex-col space-y-5'>
           <div className='flex flex-col space-y-2'>
                <h5 className='text-slate-500 font-light '>Enter city name</h5>

                <select className='bg-white rounded-lg border outline-none py-2 px-4 text-slate-500 font-light'>
                     <option>Houston,Dallas</option>

                </select>

           </div>


           <div className='bg-white px-6 py-4 w-full flex-col rounded-lg'>
                 <div className='flex flex-col space-y-1.5'>
                       <h5 className='text-slate-600'>Choose option</h5>

                        <div className='rounded-full border w-1/3 px-4 py-1 flex items-center space-x-3'> 
                            <input 
                                type={"radio"}
                            />

                            <h5 className='font-light text-slate-700 '>{"FedEx Office"}</h5>
                      </div>

                 </div>


                 <div className='flex flex-col space-y-2 py-4'>
                        <h5 className='text-slate-500 font-light '>Choose Office</h5>

                        <select className='bg-white rounded-lg border outline-none py-2 px-4 text-slate-500 font-light'>
                            <option>Delivery office</option>

                        </select>

                  </div>

                <div className='flex flex-col space-y-2.5 py-5'>
                     {["United States Postal Service","UPS (United Parcel Service)","Blue Dart Shipping","Directly from seller"].map((text)=>{
                          return(
                            <div className='rounded-full border w-1/2 px-4 py-1 flex items-center space-x-3'> 
                            <input 
                                type={"radio"}
                            />

                            <h5 className='font-light text-slate-700 '>{text}</h5>
                         </div>
                          )
                     })

                     }
                
                </div>

           </div>

    </div>
  )
}
