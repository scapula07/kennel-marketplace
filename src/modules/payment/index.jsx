import React from 'react'
import Layout from '../../layout'
import { BiLogoVisa } from "react-icons/bi";
import pay1 from "../../assets/pay1.png"
import pay2 from "../../assets/pay2.png"
import pay3 from "../../assets/pay3.png"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

export default function Payment() {
  return (
    <Layout>
                
             <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-4xl font-semibold '>Payment methods</h5>

                            
                                <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Save changes</button>

                            </div>


                            <div className='flex flex-col space-y-4 w-full'>
                                 <div className='py-4 '>
                                    <h5 className='text-xl fonnt-semibold text-slate-600'>Credit cards</h5>

                                 </div>
                          {[
                            {
                                img:pay1,
                                text:"Visa ending in 2533"

                            },
                            {
                                img:pay2,
                                text:"Mastercard ending in 2533"

                            },
                            {
                                img:pay3,
                                text:"Visa ending in 2533"

                            }
                       


                           ].map((item)=>{
                              return(
                                  <div className='flex w-3/5 bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
                                      <img 
                                        src={item?.img}
                                        className="w-10 h-10"
                                      />

                                      <div className='flex w-full justify-between'>
                                          <div className='flex flex-col'>
                                                <div className='flex flex-col'>
                                                     <h5 className='text-lg text-slate-700 font-light'>{item?.text}</h5>
                                                     <h5 className='text-sm text-slate-500 '>Expiry 06/2024</h5>
                                                </div>

                                                <div className='flex items-center'>
                                                </div>
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

                     <div className='flex flex-col space-y-4 w-full'>
                                 <div className='py-4 flex items-center space-x-4'>
                                    <IoMdAdd 
                                      className='text-3xl text-slate-500'
                                    />
                                    <h5 className='text-lg font-light text-slate-600'>Add new payment method</h5>

                                 </div>
                    </div>

  

                </div>

              
        </div>


    </Layout>

  )
}
