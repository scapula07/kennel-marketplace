import React ,{useState,useEffect} from 'react'
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { ClipLoader } from 'react-spinners';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegBookmark,FaRegStar,FaBookmark  } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { Link } from 'react-router-dom';
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc } from 'firebase/firestore'
 import { db } from '../firebase';

export default function SellerServices() {
    const [products,setProducts]=useState([])
     
    useEffect(()=>{
      const q = query(collection(db, "products"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const products = []
          querySnapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id })
  
          });
  
  
          setProducts(products)
  
  
     
        });
     },[])
  
     console.log(products,"producys")
  return (
    <div className='w-full py-8'>
               <div className='flex flex-col space-y-2'>
                      <h5 className='text-6xl font-semibold'>All services</h5>
                      <h5 className='text-slate-500  '>Check all services from this seller</h5>

                  </div>
         
         <div  className='grid grid-flow-row grid-cols-4  gap-4 gap-y-8 h-full w-full py-6'>
                  {products?.map((product)=>{
                      return(
                         <Card 
                            product={product}
                         />
                       )
                  })}


         </div>

    </div>
  )
}







const Card=({product})=>{
    const currentUser=useRecoilValue(accountTypeState)
    const saved=useRecoilValue(saveTypeState)
           const [isLoading,setLoader]=useState(false)
           const [isSaving,setSave]=useState(false)
  
           const addTocart=async()=>{
              setLoader(true)
              try{
                //   const res=await productApi.addToCart(product,currentUser)
                  res&&setLoader(false)
                }catch(e){
                console.log(e)
                setLoader(false)
              }
           }
  
           const save=async()=>{
            setSave(true)
            try{
                // const res=await productApi.save(product,currentUser)
                res&&setSave(false)
              }catch(e){
              console.log(e)
              setSave(false)
            }
         }
  
        
      return(
        <div className='flex flex-col w-full space-y-4'>
              
            <div className='relative h-72 w-full'>
           
                  <img 
                      src={product?.images?.length !=undefined?product?.images[0] :""}
                      className="w-full h-full rounded-lg"
      
                    />
           
  
                <div className='absolute top-0 z-30 w-full h-full'>
                      <div className='w-full h-full flex flex-col justify-between items-end px-4 py-2'>
                        {isSaving?
                            <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full text-xs text-slate-800'>
                                 Saving...
      
                               </h5>
                             
                               :
  
                                <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full'
                                  onClick={save}
                                >
                                  {saved?.includes(product?.id)?
                                        <FaBookmark  
                                           className='text-orange-700'
                                   
                                        />
                                        :
                                        <FaRegBookmark 
                                   
                                        />
  
                                  }
                              
      
                            </h5>
  
  
                        }
                     
                         <h5 className='bg-white flex items-center p-2 rounded-full'>
                           {[1,2,3,4,5].map(()=>{
                             return(
                                <MdOutlineStar 
                                  className='text-yellow-300 '
                                />
                             )
                           })
   
                           }
   
                         </h5>
   
                      </div>
                    
  
   
                </div>
   
            </div>
            
   
            <div className='flex flex-col space-y-3'>
                <Link  to={`/product`}
                      state={{
                         product
                    }}
                    >                <h5 className='text-slate-500 text-xl font-semibold'>{product?.name}</h5>
              </Link>
               <h5 className='text-slate-400 text-sm '>{product?.description}</h5>
               <h5 className=' text-2xl font-semibold'>{product?.price} {product?.currency}/hr</h5>
   
            </div>
   
            <div className='w-full flex justify-center'>
           {isLoading?
                <ClipLoader 
                   color={"#C74A1F"}
                />
                :
               <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}
                    onClick={addTocart}
               >
{/*                     
                              <MdOutlineShoppingCart 
                                   className='text-xl' 
                                /> */}
                                <span>Book</span>
   
               </button>
  }
            </div>
   
        </div>
       )
   }