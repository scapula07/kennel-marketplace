import React,{useEffect,useState} from 'react'
import Layout from '../../layout'
import Filters from './components/filters'
import Products from './components/products'
import { productApi } from '../api/product'

export default function Market() {
  const [prices,setPrices]=useState({low:0,high:1000})
  
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

     const [filters,setFilter]=useState([])
     const [products,setProducts]=useState([])
     const [isLoading,setLoading]=useState(false)
     const [isFindingPrice,setFinding]=useState(false)
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

      const findPrice=async()=>{
         setFinding(true)
       try{
          const res=await productApi.findPrice(prices)
          console.log(res,"resss")
          res?.length >0&&setProducts(res)
          setFinding(false)
        }catch(e){
          setFinding(false)
          console.log(e)
        }
    }

  return (
    <Layout>
        <div className='w-full md:px-28 px-4 py-10 '>
             <h5 className='text-2xl font-semibold '>Marketplace</h5>

             <div className='flex w-full md:py-6 md:space-x-10'>
                   <div className='md:w-1/5 hidden md:flex overflow-y-scroll '>
                       <Filters 
                          filters={filters}
                          setFilter={setFilter}
                          apply={apply}
                          isLoading={isLoading}
                          prices={prices}
                          setPrices={setPrices}
                          isFindingPrice={isFindingPrice}
                          findPrice={findPrice}
                       />
 
                   </div>
                    <div className='flex flex-col md:w-4/6 w-full'>


                          <Products 
                             products={products}
                             setProducts={setProducts}
                          />

                    </div>

             </div>
        
        </div>

    </Layout>

  )
}
