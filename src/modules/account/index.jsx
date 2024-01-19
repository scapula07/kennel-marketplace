import React from 'react'
import Layout from '../../layout'
import breeder from "../../assets/breeder.png"
import { RxArrowRight } from "react-icons/rx";

export default function Accoount() {
  return (
    <Layout>
            <div className='w-full h-full flex justify-center py-10'>
                 <div className='flex flex-col w-3/4 space-y-10'> 
                          <div className='flex w-full justify-between '>
                              <h5 className='text-4xl font-semibold '>My account</h5>

                              <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Log out</button>

                          </div>

                          <div className='flex items-center space-x-8'>
                              <img
                                   src={breeder}
                                   className="rounded-full"
                               />

                               <div className='flex flex-col space-y-4'>
                                  <h5 className='text-2xl font-semibold '>Carter Curtis</h5>
                                 <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>View profile</button>

                               </div>

                          </div>


                            <div className='flex flex-col space-y-6 py-4'>
                                 {[
                                    {
                                      label:"My orders ",
                                      link:""
                                    },
                                    {
                                      label:"Saved ",
                                      link:""
                                    },
                                    {
                                      label:"Account information ",
                                      link:""
                                    },
                                    {
                                      label:"Payment methods ",
                                      link:""
                                    },
                                    {
                                      label:"My wallet "
                                    },
                                    {
                                      label:"Settings "

                                    }

                                  ].map((item)=>{
                                     return(
                                        <div className='flex justify-between py-2 px-4 rounded-lg shadow-lg '>
                                           <h5>{item?.label}</h5>
                                           <RxArrowRight  
                                              className='text-blue-600 text-xl'
                                           />



                                        </div>
                                     )
                                 })

                                 }



                            </div>

                 </div>

            </div>

    </Layout>

  )
}
