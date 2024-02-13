import React from 'react'

export default function Details({product}) {
  return (
    <div className='flex flex-col w-3/5 py-6 space-y-4 '>
          <h5 className='text-2xl font-semibold'>{product?.name}</h5>

          <div className='border rounded-full flex items-center w-1/2 justify-between'>
              <button className='rounded-full py-2 bg-green-900 px-6 text-white text-sm'>Information</button>
              <button className='rounded-full py-2  px-6  text-sm'>Payment & Delivery</button>

          </div>

          <div className='flex flex-col'>
              <p className='text-slate-500 text-sm'>
                {product?.description}
              </p>
              <div className='py-4'>
                 {[`weight:${product?.weight}g`,
                    `sizes:${product?.sizes}`,

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
