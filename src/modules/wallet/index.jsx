import React from 'react'
import Layout from '../../layout'

export default function Wallet() {
  return (
    <Layout>
         <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-4xl font-semibold '>My Wallet</h5>

                                <button className='text-white py-1.5 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Deposit</button>

                            </div>

                     </div>

                     <div className='flex items-center'>
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
                       


                           ].map(()=>{
                              return(
                                  <div className='flex flex-col'>
                                      <h5></h5>
                                      
                                   
                                  </div>
                              )
                           })

                          }
 
                     </div>
        </div>

    </Layout>

  )
}
