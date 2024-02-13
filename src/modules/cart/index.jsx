import React,{useState,useEffect} from 'react'
import Layout from '../../layout'
import { MdOutlineDeleteOutline } from "react-icons/md";
import prod from "../../assets/prod.png"
import { Link, useLocation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';


export default function Cart() {

      const location =useLocation()

      const products=location?.state?.products

      console.log(products,"prodyct ")
  return (
    <Layout>
        <div className='w-full h-full flex justify-center py-10'>
                <div className='flex flex-col w-3/4 space-y-10'> 
                        <div className='flex w-full justify-between '>
                            <h5 className='text-4xl font-semibold '>My cart</h5>
                       </div>


                       <div className='flex flex-col space-y-4 w-full '>
                                 <div className='py-4 '>
                                    <h5 className='text-sm font-light text-blue-600'>You have {products?.length} items in your cart</h5>

                                 </div>

                     <div className='flex flex-col space-y-4'>


                          {products?.map((product)=>{
                              return(
                                 <Card 
                                   item={product}
                                 />
                              )
                           })

                          }

                    <div className='flex w-3/5 justify-end'>
                             <div className='flex items-center space-x-4'>
                                 <h5>Total:$0</h5>
                                 <Link to="/checkout"
                                    state={{
                                      products
                                      }}
                                 >
                               
                                      <button className='bg-orange-600 py-3 px-6 rounded-lg text-white' >Checkout</button>
                                 </Link>

                             </div>

                       </div>
                       </div>


 
                     </div>
                    
                </div>


            </div>

    </Layout>

  )
}





const Card=({item})=>{
     const [product,setProduct]=useState({images:[]})
     useEffect(()=>{
      
      if(item?.id?.length != undefined){
        const unsub = onSnapshot(doc(db,"products",item?.id), (doc) => {
          console.log(doc.data(),"daa")
      
          setProduct({...doc.data(),id:doc?.id})
         });
        }
       },[])

       console.log(product,"prod")
   return(
    <div className='flex w-3/5 bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
    <img 
      src={product?.images[0]}
      className="w-20 h-20"
    />

    <div className='flex w-full justify-between'>
        <div className='flex flex-col'>
              <div className='flex flex-col space-y-3'>
                   <h5 className='text-lg text-slate-700 font-light'>{product?.name}</h5>
                   <h5 className='text-sm text-slate-500 '>{product?.description}</h5>
              </div>

              <div className='flex items-center'>
              </div>
        </div>
      

      <div>
      </div>
        <MdOutlineDeleteOutline 
            className='text-slate-500 text-2xl'
        />

    </div>
   
 
</div>

   )
}