import React from 'react'
import Layout from '../../layout'
import { MdShoppingCart } from "react-icons/md";
export default function Notifications() {
  return (
    <Layout>
          <div className='h-full w-full flex px-20 py-4'>
                <div className='flex flex-col w-2/5 space-y-10'> 
                        <h5 className='text-3xl font-semibold'>Notifications</h5>

                        <div className='flex flex-col space-y-8'>
                            {[1,2,3,4]?.map(()=>{
                                  return(
                                    <Card />
                                  )
                            })

                            }
                        </div>

                </div>
                
            
          </div>
    </Layout>

  )
}




const Card=()=>{
      return(
        <div className='flex w-full justify-between px-4 py-2 rounded-lg border'>
                 <div className='flex w-1/4 items-center space-x-4'>
                       <h5 className='p-2 bg-blue-200 rounded-lg'>
                           <MdShoppingCart className='text-slate-600 text-lg'/>
                       </h5>
                       <h5 className='font-semibold'>Purchase:</h5>

                 </div>

                 <div>
                    
                </div>

        </div>
      )
}