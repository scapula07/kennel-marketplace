import React,{useEffect} from 'react'
import { useState } from 'react';
import Layout from '../../layout'
import Filters from './components/filters'
import Seller from './components/seller'

export default function Sellers() {
  useEffect(() => {
       
    window.scrollTo(0, 0);

  
}, []);
   const [sellers,setSeller]=useState([])
   const [filters,setFilter]=useState([])
   const [isLoading,setLoading]=useState(false)
   const apply=async()=>{
        setLoading(true)
       try{
          // const res=await productApi.filterProducts(filters)
          console.log(res,"resss")
          res?.length >0&&setProducts(res)
          setLoading(false)
        }catch(e){
          setLoading(false)
          console.log(e)
        }
    }
  return (
    <Layout>
             <div className='w-full md:px-28 px-4 py-10 '>
             <h5 className='text-2xl font-semibold '>Sellers</h5>

             <div className='flex w-full md:py-6 space-x-10'>
                   <div className='md:w-1/5 hidden md:flex overflow-y-scroll '>
                     <Filters 
                          filters={filters}
                          setFilter={setFilter}
                          apply={apply}
                          isLoading={isLoading}
                       />
 
                   </div>
                    <div className='flex flex-col md:w-4/6 w-full '>
                          <Seller 
                            sellers={sellers}
                            setSeller={setSeller}
                          />

                    </div>

             </div>
        
        </div>

    </Layout>

  )
}
