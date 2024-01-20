import React from 'react'
import Layout from '../../layout'
import { MdOutlineDeleteOutline } from "react-icons/md";
import prod from "../../assets/prod.png"

export default function Cart() {
  return (
    <Layout>
        <div className='w-full h-full flex justify-center py-10'>
                <div className='flex flex-col w-3/4 space-y-10'> 
                        <div className='flex w-full justify-between '>
                            <h5 className='text-4xl font-semibold '>My cart</h5>
                       </div>


                       <div className='flex flex-col space-y-4 w-full '>
                                 <div className='py-4 '>
                                    <h5 className='text-sm font-light text-blue-600'>You have 2 items in your cart</h5>

                                 </div>

                     <div className='flex flex-col space-y-4'>


                          {[
                            {
                                img:prod,
                                text:"Visa ending in 2533"

                            },
                            {
                                img:prod,
                                text:"Mastercard ending in 2533"

                            },
                          
                       


                           ].map((item)=>{
                              return(
                                  <div className='flex w-3/5 bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
                                      <img 
                                        src={item?.img}
                                        className="w-20 h-20"
                                      />

                                      <div className='flex w-full justify-between'>
                                          <div className='flex flex-col'>
                                                <div className='flex flex-col space-y-3'>
                                                     <h5 className='text-lg text-slate-700 font-light'>“My dog” kit</h5>
                                                     <h5 className='text-sm text-slate-500 '>Starter kit to buy when there is new dog friend in your family</h5>
                                                </div>

                                                <div className='flex items-center'>
                                                </div>
                                          </div>
                                        

                                        <div>
                                        </div>
                                          <MdOutlineDeleteOutline 
                                              className='text-slate-500 text-2xl'
                                          />

                                      </div>
                                     
                                   
                                  </div>
                              )
                           })

                          }
                       </div>
 
                     </div>
                    
                </div>


            </div>

    </Layout>

  )
}
