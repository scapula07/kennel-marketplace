import React from 'react'
import Layout from '../../layout'
import { Outlet } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

export default function Orders() {
  return (

    <Layout>
        <div className='w-full h-full flex  justify-center py-10 '>
                <div className='flex flex-col w-3/4 space-y-6'> 
                        <div className='flex w-full justify-between '>
                            <h5 className='text-4xl font-semibold '>My orders</h5>

                        </div>



                        <div className='flex items-center justifu-between w-full'>
                            <div className='border py-2 px-3 rounded-lg flex w-1/4 justify-between'>
                                    <input
                                    placeholder='Search'
                                    className='outline-none border-0 w-3/5'
                                    />
                                    <FiSearch
                                    className='text-slate-600'
                                    />

                                </div>

                   </div>



                        <div className='w-full py-10 '>
                                <div className='border rounded-full flex items-center w-1/3 justify-between'>
                                    <button className='rounded-full py-2 hover:bg-green-900 px-6 hover:text-white text-black text-sm'>Active</button>
                                    <button className='rounded-full py-2 hover:bg-green-900 px-6 hover:text-white px-6  text-sm'>Completed</button>
                                    <button className='rounded-full py-2 hover:bg-green-900 px-6 hover:text-white px-6  text-sm'>Canceled</button>

                                </div>

                        </div>




                        <div className='w-full '>
                            <Outlet /> 
                        </div>


                    </div>

                   


    </div>

    </Layout>
  )
}
