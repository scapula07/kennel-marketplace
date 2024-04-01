import React,{useEffect,useState} from 'react'
import Layout from '../../layout'
import Filters from './components/filters'
import Products from './components/products'
import { productApi } from '../api/product'
import { useLocation,useParams} from "react-router-dom";
import Seller from './components/seller'

export default function Search() {
  const [prices,setPrices]=useState({low:0,high:1000})
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);



     const [filters,setFilter]=useState([])
     const [products,setProducts]=useState([])
     const [isLoading,setLoading]=useState(false)
     const [sellers,setSeller]=useState([])
     const apply=async()=>{
          setLoading(true)
         try{
            const res=await productApi.filterProducts(filters)
            console.log(res,"resss")
            res?.length >0&&setProducts(res)
            setLoading(false)
          }catch(e){
            setLoading(false)
            console.log(e)
          }
      }

      const location =useLocation()
      const state=location?.state
      console.log(state,"state")

  return (
    <Layout>
        <div className='w-full px-28 py-10 h-screen'>
             <h5 className='text-3xl font-semibold '>Search Results</h5>

             <div className='flex w-full py-6 space-x-10'>
                   <div className='w-1/5 overflow-y-scroll h-screen'>
                       <Filters 
                          filters={filters}
                          setFilter={setFilter}
                          apply={apply}
                          isLoading={isLoading}
                       />
 
                   </div>
                    <div className='flex flex-col w-4/6 '>

                         {state?.type=="products"?
                            <Products 
                            products={state?.items}
                            setProducts={setProducts}
                           />
                              :
                           <Seller 
                           sellers={state?.items}
                           setSeller={setSeller}
                         />

                         }
                         

                    </div>

             </div>
        
        </div>

    </Layout>

  )
}
