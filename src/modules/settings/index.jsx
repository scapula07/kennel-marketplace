import React from 'react'
import Layout from '../../layout'
import breeder from "../../assets/breeder.png"
import { RxArrowRight } from "react-icons/rx";

export default function Settings() {
  return (
    <Layout>
            <div className='w-full h-full flex justify-center py-10'>
                 <div className='flex flex-col w-3/4 space-y-10'> 
                          <div className='flex w-full justify-between '>
                              <h5 className='text-4xl font-semibold '>Settings</h5>

                          
                              <button className='text-white py-1.5 text-sm px-4 rounded-lg border border-orange-700 text-orange-700'>Delete account</button>
                             


                          </div>

            


                            <div className='flex flex-col space-y-6 py-8'>
                                 {[
                                    {
                                      label:"Terms of Service ",
                                      link:""
                                    },
                                    {
                                      label:"Privacy Policy",
                                      link:""
                                    },
                                    {
                                      label:"Licenses "
                                    },
                                    {
                                      label:"Notification settings "

                                    }

                                  ].map((item)=>{
                                     return(
                                        <div className='flex justify-between py-4 px-4 rounded-lg shadow-lg '>
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
