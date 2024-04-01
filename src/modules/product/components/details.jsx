import React,{useState} from 'react'

export default function Details({product}) {
     const [select,setSelect]=useState("info")
  return (
    <div className='flex flex-col w-3/5 py-6 space-y-4 '>
          <h5 className='text-2xl font-semibold'>{product?.name}</h5>

          <div className='border rounded-full flex items-center w-1/2 justify-between'>
              <button className={`${select =="info"?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`} onClick={()=>setSelect("info")}>Information</button>
              <button className={`${select =="payment"?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`} onClick={()=>setSelect("payment")}>Payment & Delivery</button>

          </div>
          {select==="info"?

         
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
             :
             <div className='flex flex-col'>
                <h5 className='text-sm font-semibold'>Platform support payment with only Stripe </h5>
            </div>
}

    </div>
  )
}
