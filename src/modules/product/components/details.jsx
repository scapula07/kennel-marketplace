import React from 'react'

export default function Details() {
  return (
    <div className='flex flex-col w-3/5 py-6 space-y-4 '>
          <h5 className='text-2xl font-semibold'>Dog treats “My happy pet”</h5>

          <div className='border rounded-full flex items-center w-1/2 justify-between'>
              <button className='rounded-full py-2 bg-green-900 px-6 text-white text-sm'>Information</button>
              <button className='rounded-full py-2  px-6  text-sm'>Payment & Delivery</button>

          </div>

          <div className='flex flex-col'>
              <p className='text-slate-500 text-sm'>
                 Bring chew-rific fun to your best buddy’s day with My happy pet long-lasting dog bones and chew treats. Available in small, medium and large sizes and a variety of shapes and textures, Happy pet makes it simple to delight every dog in your pack. Select from chews made with real beefhide-rawhide made from farm-raised cattle or easily digestible, rawhide-free alternatives, and let your dog get lost in his own Busy world.
              </p>
              <div className='py-4'>
                 {["Busy Bone Chews Provide Long-Lasting Fun",
                 "Multiple Sizes for Every Dog in Your Family",
                 "Available in a Variety of Forms",
                 "Yum and Fun, Rolled into One"
                 ].map((text)=>{
                     return(
                        <li className='text-slate-500 text-sm'>{text}</li>
                     )
                 })
                }

              </div>

          </div>

    </div>
  )
}
