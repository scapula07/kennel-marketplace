import React from 'react'
import Layout from '../../layout'
import { FiSearch,FiArrowRight,FiSmile } from "react-icons/fi";
import breeder from "../../assets/breeder.png"
import { MdOutlineAttachment } from "react-icons/md";


export default function Messages() {
  return (
    <Layout>
                <div className='w-full flex justify-center h-screen py-8'>
                      <div className='flex bg-white w-4/6 h-full rounded-lg'>
                            <div className='w-2/5 border-r h-full flex-col px-6'>
                                  <div className='py-6 '>
                                     <h5 className='text-xl font-semibold'>All messages</h5>
                                  </div>
                                  <div className='border py-2 px-3 rounded-lg flex w-full justify-between'>
                                         <input
                                            placeholder='Search'
                                            className='outline-none border-0 w-full'
                                            />
                                            <FiSearch
                                            className='text-slate-600'
                                            />

                                        </div>
                                    
                                    <div className='flex flex-col py-4 space-y-8'>
                                         {[1,2].map(()=>{
                                                 return(
                                                    <div className='w-full flex flex-col space-y-1'>
                                                           <div className='w-full flex items-center space-x-3'>
                                                                <div className='flex items-center space-x-2'>
                                                                     <h5 className='h-2 w-2 rounded-full bg-green-900'></h5>
                                                                      <img
                                                                        src={breeder} 
                                                                       className="h-10 w-10 rounded-full"
                                                                      />
                                                                </div>

                                                                <div className='flex flex-col '>
                                                                     <h5 className='text-slate-700 text-sm font-semibold'>Phoenix Baker</h5>
                                                                     <h5 className='text-xs font-light text-slate-600'>Dog breeder</h5>
                                                                     
                                                                </div>
                                                             

                                                           </div>

                                                           <div className='w-full'>
                                                             <p className=' text-xs font-light text-slate-800'>Hey Olivia, can you sent me over the la test doc. I just have a quick questio...</p>
                                                           </div>

                                                    </div>
                                                 )
                                            })
                                         }

                                    </div>


                            </div>

                           <div className='w-full h-full flex flex-col relative  '>
                                  <div className='flex items-center justify-between absolute top-0 py-4 border-b w-full px-5 '>
                                        <div className='flex items-center space-x-6'>
                                            <img
                                                src={breeder} 
                                                className="rounded-full w-14 h-14"
                                            />

                                            <h5 className='text-lg font-light'>Phoenix Baker</h5>


                                        </div>

                                        <div className='flex items-center space-x-8 '>
                                                <button className='text-blue-600 py-1.5 text-sm space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center  border border-blue-600 ' >
                                                        Archive
                                                

                                                    </button>
                                                    <button className='text-blue-600 py-1.5 text-sm space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center  border border-blue-600 ' >
                                                        <span>Go to seller page</span>
                                                        <FiArrowRight
                                                            className='text-xl' 
                                                        />
                                                

                                                    </button>

                                        </div>
                                    
                                    </div>

                                    <div className=' h-full pt-20 flex flex-col   '>
                                          <div className=' h-4/5 w-full'>

                                          </div>
                                          <div className=' h-1/5 w-full px-6 py-3'>
                                              <div className='flex flex-col border rounded-xl bg-white h-full px-6 py-2 space-y-1' >
                                                   <textarea 
                                                     placeholder='Enter a message'
                                                      className='outline-none'
                                                      
                                                   />
                                                   <div className='flex justify-end'>
                                                        <div className='flex items-center space-x-2'>
                                                              <FiSmile 
                                                                 className='text-slate-700 text-2xl'
                                                               
                                                               />
                                                              <MdOutlineAttachment
                                                                    className='text-slate-700 text-2xl'
                                                               />

                                                              <button className='py-2 px-4 text-sm rounded-lg text-white bg-green-900 rounded-lg'>
                                                                 Send
                                                              </button>

                                                        </div>

                                                   </div>

                                              </div>
                                             

                                         </div>

                                    </div>
                            
                            </div>

                      </div>

                </div>

    </Layout>

  )
}
