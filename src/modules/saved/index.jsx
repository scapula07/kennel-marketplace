import React ,{useEffect} from 'react'
import Layout from '../../layout'
import Products from './products'
import Seller from './seller'
import { saveTypeState,preOrdersTypeState } from '../recoil/state'
import { useRecoilValue } from 'recoil'
import PreOrdered from './preOrder'

export default function Saved() {
    const saved=useRecoilValue(saveTypeState)
    const preorders=useRecoilValue(preOrdersTypeState )
    
    useEffect(() => {     
      window.scrollTo(0, 0) 
     }, []);
  return (
    <Layout>
              <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/5 space-y-10'> 
                            <div className=' '>
                                <h5 className='text-4xl font-semibold '>Pre ordered items</h5>
                            </div>

                            <PreOrdered
                              preorders={preorders}
                             />

                            <div className='py-6 '>
                                <h5 className='text-4xl font-semibold '>Saved products</h5>
                            </div>

                            <Products 
                               saved={saved}
                            />

                      
                          

                        </div>
                    

              </div>

    </Layout>

  )
}
