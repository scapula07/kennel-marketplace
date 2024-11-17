import React,{useState} from 'react'
import { FaStar } from "react-icons/fa";


export default function Details({product}) {
     const [select,setSelect]=useState("info")
  return (
    <div className='flex flex-col md:w-3/5 w-full py-6 space-y-4 px-4 md:px-0'>
          <h5 className='text-2xl font-semibold'>{product?.name}</h5>

          <div className='border rounded-full flex items-center md:w-2/5 w-3/5 justify-between'>
              <button className={`${select =="info"?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`} onClick={()=>setSelect("info")}>Information</button>
              <button className={`${select =="payment"?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`} onClick={()=>setSelect("payment")}>Reviews</button>


          </div>
          {select==="info"?

         
          <div className='flex flex-col'>
              <p className='text-slate-500 text-sm'>
                {product?.description}
              </p>
              <div className='py-4'>
                 {[`Weight:${product?.weight}g`,
                    

                 ].map((text)=>{
                     return(
                        <li className='text-slate-500 text-sm'>{text}</li>
                     )
                 })
                }

              {product?.features?.map((text)=>{
                      return(
                         <li className='text-slate-500 text-sm'>{text?.value}</li>
                      )
                  })
                 }

              </div>

          </div>
             :
             <div className='flex flex-col space-y-6'>
                <h5 className='text-sm font-semibold'>COMMENTS FROM VERIFIED PURCHASES({product?.reviews?.length}) </h5>
                {product?.reviews?.slice(0,5)?.map((rev)=>{
                     return(
                        <diiv className="flex flex-col space-y-1">
                              <div className='flex items-center space-x-1'>
                                 {Array(rev.rating).fill(1)?.map(()=>{
                                    return(
                                         <FaStar className='text-yellow-400 text-2xl' />
                                    )
                                 })}
                              </div>
                              <h5>{rev?.text}</h5>
                              <h5 className='text-slate-500 font-light'>by {rev?.user}</h5>

                        </diiv>
                     )
                })

                }
            </div>
}

    </div>
  )
}
