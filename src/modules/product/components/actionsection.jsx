import React,{useEffect,useState} from 'react'
import { FaRegBookmark,FaRegStar } from "react-icons/fa";
import { MdOutlineStar,MdOutlineShoppingCart  } from "react-icons/md";
import breeder from "../../../assets/breeder2.png"
import { FiArrowRight } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where,orderBy}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { Link } from 'react-router-dom';
import { messageApi } from '../../api/message';
import { db } from '../../firebase';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { accountTypeState } from '../../recoil/state';
import { useRecoilValue } from 'recoil';
import { productApi } from '../../api/product';
import { analytics } from '../../firebase';
import {  logEvent } from "firebase/analytics";


export default function Actionsection({product}) {
      const currentUser=useRecoilValue(accountTypeState)
      const [seller,setSeller]=useState({})
      const [products,setProducts]=useState([])
      const [isLoading,setLoader]=useState(false)
      const [isSaving,setSave]=useState(false)
      const [loading,setLoading]=useState(false)
      const navigate=useNavigate()
        useEffect(()=>{
        
          if(product?.creator?.length != undefined){
            const unsub = onSnapshot(doc(db,"users",product?.creator), (doc) => {
              console.log(doc.data(),"daa")
          
              setSeller({...doc.data(),id:doc?.id})
            });
            }
          },[])


          const startMsg=async()=>{
            setLoader(true)
              try{
                const res=await messageApi.startConversation(seller,currentUser)
                setLoader(false)
                res&&navigate("/messages")
              }catch(e){
                console.log(e)
              }
          }


  
 
          const addTocart=async()=>{
             setLoading(true)
             try{
                 const res=await productApi.addToCart(product,currentUser,"product")
                 logEvent(analytics, 'add_to_cart', {items:[{...product,affiliation:product?.creator,category:`${categories[0]}`}]});
                 res&&setLoading(false)
               }catch(e){
               console.log(e)
               setLoading(false)
             }
          }
 
          const save=async()=>{
           setSave(true)
           try{
               const res=await productApi.save(product,currentUser,"product")
               logEvent(analytics, 'add_to_wishlist', {items:[{...product,affiliation:product?.creator,category:`${categories[0]}`}]});
               res&&setSave(false)
             }catch(e){
             console.log(e)
             setSave(false)
           }
        }
 

        function calculateAverageRating(reviews) {
    
          let sum = 0;
          let count = 0;
      
   
          reviews.forEach(review => {
              sum += review.rating;
              count++;
          });
          const averageRating = count > 0 ? sum / count : 0;
      
          return averageRating;
      }
        
  return (
    <div className='flex w-1/2 flex-col py-6 space-y-6'>

         <div className='flex flex-col'>
                <div className='flex items-center justify-between'> 
                    <h5 className='font-semibold text-3xl'>{product?.price} {product?.currency}</h5>
                    <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full'>
                            <FaRegBookmark 
                                className='text-blue-600 text-xl'
                            />

                        </h5>
                </div>

               <div className='flex items-center'>
                  <h5 className='text-sm text-slate-500'>Rating {product?.reviews?.length >0&&calculateAverageRating(product?.reviews)} of 5</h5>
                  <h5 className='bg-white flex items-center p-2 rounded-full'>
                        {product?.reviews?.length >0&&Array(calculateAverageRating(product?.reviews)).fill(1)?.map(()=>{
                          return(
                             <MdOutlineStar 
                               className='text-yellow-500 '
                             />
                          )
                        })

                        }

                      </h5>
                
              </div>

         </div>


         <div className='flex flex-col space-y-4'>
                    <div className='bg-white rounded-lg py-3 px-4 flex items-center rounded-xl shadow-sm justify-between'>
                            <div className='flex items-center space-x-4'>
                                  {seller?.img?.length !=undefined?
                                            <img 
                                            src={seller?.img}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        :
                                        <h5 className='rounded-full bg-orange-400 text-white text-lg font-semibold h-10 w-10 flex items-center justify-center'>{seller?.name?.slice(0,1)}</h5>


                                  }
                               
                                    <div className='flex flex-col'>
                                        <h5 className='text-xl font-semibold text-slate-600'>{seller?.name}</h5>
                                        <h5 className='text-sm text-slate-400 font-light'>{""}</h5>

                                    </div>
                              </div>
                              <Link to="/seller"
                                       state={{
                                        seller
                                   }}
                                >
                                <FiArrowRight
                                    className='text-blue-500 text-3xl '
                                  />
                            </Link>
                          


                    </div>



                    <div className='bg-slate-200 rounded-lg py-3 px-4 flex items-center rounded-xl shadow-sm justify-between'>
                            <div className='flex items-center space-x-4'>
                                   <IoDocumentTextOutline 
                                     className='text-slate-500 text-4xl font-light'
                                   />
                                    <div className='flex flex-col'>
                                        <h5 className='text-xl font-light'>Contract signing required!</h5>
                                 

                                    </div>
                              </div>

                            

                    </div>

         </div>


         <div className='flex flex-col space-y-4'>
              {product?.sizes.map((text)=>{
                 return(
                     <div className='rounded-full border px-4 py-2 flex items-center space-x-3'> 
                       <input 
                          type={"radio"}
                       />

                       <h5 className='font-light text-slate-700 text-lg'>{text?.label}({text?.value}kg)</h5>
                    </div>
                 )
              })}

         </div>


         <div className='flex flex-col space-y-12'>

                    <div className='flex flex-col w-1/5 space-y-1'>
                         <h5 className='text-slate-600'>Quantity</h5>
                         <input 
                          className='border border-orange-700 rounded-lg py-2 px-2'
                          placeholder='1'
                         />

                    </div>

                    <div className='flex flex-col space-y-4'>
                       {loading?
                               <div className='w-full flex justify-center'>
                                     <ClipLoader
                                        color="#C74A1F"
                                      />
                                </div>
                                :
                            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full'
                             style={{background:"#C74A1F"}}
                             onClick={addTocart}
                             >
                        
                                        <MdOutlineShoppingCart 
                                            className='text-xl' 
                                        />
                                        <span>Add to cart</span>

                            </button>
                        }

                            {isLoading?
                               <div className='w-full flex justify-center'>
                                     <ClipLoader
                                        color="#C74A1F"
                                      />
                                </div>
                                :
                                <button className='text-blue-600 py-3 space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center w-full border border-blue-600 ' 
                                      onClick={startMsg}
                                  >
                                      <span>Send message to seller</span>
                                      <FiArrowRight
                                          className='text-xl' 
                                      />
                         
 
                              </button>


                            }

                       

                    </div>

         </div>


    </div>
  )
}
