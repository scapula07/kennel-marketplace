import React,{useEffect,useState} from 'react'
import { MdOutlineStar } from "react-icons/md";
import { useLocation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
export default function ProductDetails() {
    const [product,setProduct]=useState({images:[]})
    const location =useLocation()

    const id=location?.state

    console.log(id)

    useEffect(()=>{
      
        if(id?.length != undefined){
          const unsub = onSnapshot(doc(db,"products",id), (doc) => {
            console.log(doc.data(),"daa")
        
            setProduct({...doc.data(),id:doc?.id})
           });
          }
         },[])

         console.log(product,"prod")
  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Admin/Products</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-4 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-xl font-semibold text-black'>Product Details</h5>
                        </div>


                        <div className='flex w-full'> 
                                <div className='w-1/2 flex flex-col space-y-6'> 
                                     <div>
                                          <img 
                                             src={product?.images[0]}
                                             className="w-3/4 h-44 rounded-lg"
                                          />
                                     </div>

                                     <div className='flex items-center space-x-4'>
                                         {product?.images?.map((src)=>{
                                              return(
                                                <img 
                                                  src={src}
                                                  className="h-20 rounded-lg"
                                                />
                                              )
                                         })

                                         }

                                     </div>

                                </div>


                                <div className='flex flex-col w-1/2 space-y-8'>
                                          <div className='flex flex-col space-y-4'>
                                               <h5 className='text-3xl'>{product?.name}</h5>
                                               <h5 className='flex items-center space-x-1'>
                                                  {[1,2,3,4,5].map(()=>{
                                                        return(
                                                        <MdOutlineStar 
                                                            className='text-slate-500 text-xl'
                                                            />
                                                        )
                                                        })

                                                        }
                                                   </h5>

                                                   <h5 className='flex flex-col'>
                                                       <span className='font-semibold text-slate-700'>Price</span>
                                                       <span className='text-xl font-semibold text-slate-700'>{product?.currency=="USD"?"$":"GBP"} {product?.price}</span>

                                                   </h5>
                                                   <h5 className='bg-green-300 text-green-800 py-1 px-6 rounded-lg w-28 text-sm font-semibold'>In stock</h5>

                                           </div>

                                        <div className='flex flex-col'>
                                               <h5 className='font-semibold'>Description</h5>
                                               <p className='text-lg font-light'>
                                                    {product?.description}

                                               </p>
                                            
                                        </div>

                                        <div>
                                          <Link to={"/admin/edit" } state={{product}}>
                                             <button className='bg-orange-400 py-2 px-6 rounded-lg text-white '>Edit product</button>
                                          </Link>
                                         
                                        </div>
                                    
                                </div>

                        </div>
                </div>
        </div>
  )
}
