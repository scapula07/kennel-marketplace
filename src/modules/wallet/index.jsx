import React from 'react'
import Layout from '../../layout'
import Transactions from './components/transactions'

export default function Wallet() {
  return (
    <Layout>
         <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-4xl font-semibold '>My Wallet</h5>

                                <button className='text-white py-1.5 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Deposit</button>

                            </div>


                            <div className='flex items-center space-x-6'>
                          {[
                            {
                                label:"Balance",
                                amount:"122200"

                            },
                            {
                                label:"Reserved in orders",
                                amount:"122200"

                            },
                            {
                                label:"Available",
                                amount:"122200"

                            }
                       


                           ].map((item)=>{
                              return(
                                  <div className='flex flex-col bg-white py-4 px-4 rounded-lg space-y-2'>
                                      <h5 className='text-sm text-slate-600 '>{item?.label}</h5>
                                      <h5 className='text-xl font-semibold'>${item?.amount}</h5>
                                      
                                   
                                  </div>
                              )
                           })

                          }
 
                     </div>

                     <Transactions />

                </div>

              
        </div>

    </Layout>

  )
}
