import React from 'react'
import Layout from '../../layout'
import Products from './products'
import Seller from './seller'
import { saveTypeState } from '../recoil/state'
import { useRecoilValue } from 'recoil'

export default function Saved() {
    const saved=useRecoilValue(saveTypeState)
  return (
    <Layout>
              <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/5 space-y-10'> 
                            <div className=' '>
                                <h5 className='text-4xl font-semibold '>Saved items</h5>
                            </div>

                            <Products 
                               saved={saved}
                            />

                            <div className='py-6 '>
                                <h5 className='text-4xl font-semibold '>Saved sellers</h5>
                            </div>

                            <Seller />

                        </div>
                    

              </div>

    </Layout>

  )
}
