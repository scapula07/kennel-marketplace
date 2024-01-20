import React from 'react'
import Layout from '../../layout'
import Order from './order'

export default function Checkout() {
  return (
    <Layout>
             <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-4xl font-semibold '>Checkout</h5>

                            </div>




                            <div className='flex w-full space-x-10 '>
                                   <div className='w-3/4'> 
                                       <Order />

                                   </div>


                                     <div className='w-1/4'> 
                                          <div className='bg-white flex-col flex rounded-lg w-full space-y-5 px-3 shadow py-5'>
                                               <h5 className='text-lg font-semibold'>Total:</h5>
                                               <div className='flex flex-col space-y-1'>

                                                     <div className='flex items-center w-full justify-between'>
                                                           <h5 className='font-light text-slate-800 text-sm'>Items price</h5>
                                                           <h5 className='text-blue-600 text-sm'>$130</h5>

                                                     </div>
                                                     <div className='flex items-center w-full justify-between'>
                                                           <h5 className='font-light text-slate-800 text-sm'>Delivery price</h5>
                                                           <h5 className='text-blue-600 text-sm'>$130</h5>

                                                     </div>
                                                    

                                               </div>

                                               <div className='flex items-center w-full justify-between'>
                                                           <h5 className='  text-sm font-semibold'>Total price</h5>
                                                           <h5 className='text-blue-600 text-sm'>$130</h5>

                                                 </div>

                                                 <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Confirm order</button>

                                          </div>

                                     </div>

                            </div>
                        </div>






              </div>
        
    </Layout>

  )
}
