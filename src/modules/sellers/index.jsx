import React from 'react'
import Layout from '../../layout'
import Filters from './components/filters'
import Seller from './components/seller'

export default function Sellers() {
  return (
    <Layout>
             <div className='w-full px-28 py-10'>
             <h5 className='text-3xl font-semibold '>Sellers</h5>

             <div className='flex w-full py-6 space-x-10'>
                   <div className='w-1/5 overflow-y-scroll h-screen'>
                       <Filters />
 
                   </div>
                    <div className='flex flex-col w-4/6 '>


                          <Seller />

                    </div>

             </div>
        
        </div>

    </Layout>

  )
}
