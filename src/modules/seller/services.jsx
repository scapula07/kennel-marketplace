import React ,{useState,useEffect} from 'react'
import { useRecoilValue,useRecoilState } from 'recoil';
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
 updateDoc,addDoc,where } from 'firebase/firestore'
 import { db } from '../firebase';
 import { useOutletContext } from 'react-router-dom';
 import Modal from '../../components/modal';
 import { IoMdClose } from "react-icons/io";
 import { InlineWidget ,useCalendlyEventListener} from "react-calendly";
import { productApi } from '../api/product';
import { IoDocumentTextOutline } from "react-icons/io5";
import { alertTypeState } from '../recoil/state';


export default function SellerServices() {
    const [seller]= useOutletContext();
    const [products,setProducts]=useState([])
    const [trigger,setTrigger]=useState(false)
    const [product,setProduct]=useState({})
    const [isLoading,setLoader]=useState(false)
    const [schedule,setSchedule]=useState({event:{uri:""}})
    const currentUser=useRecoilValue(accountTypeState)
    const [alert,setAlert]=useRecoilState(alertTypeState)

    useCalendlyEventListener({
      onProfilePageViewed: () => console.log("onProfilePageViewed"),
      onDateAndTimeSelected: (res) => console.log(res,"rr"),
      onEventTypeViewed: () => console.log("onEventTypeViewed"),
      onEventScheduled: (e) =>setSchedule(e.data.payload),
      onPageHeightResize: (e) => console.log(e.data.payload.height),
    });
  



    useEffect(()=>{
      if(seller?.id?.length >0){
            const q = query(collection(db, "services"),where('creator',"==",seller?.id));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const products = []
                querySnapshot.forEach((doc) => {
                  products.push({ ...doc.data(), id: doc.id })      
                });
                setProducts(products)         
              })     
      }
   
     },[seller])
  
     console.log(products,"producys")
     const addTocart=async()=>{
      if (schedule?.event?.uri== 0) {
         setAlert({color:"danger",text:"Please schedule a date!"})
        return;
      }
      setLoader(true)
      try{
          const res=await productApi.addToCart(product,currentUser,"service")

          res&&setLoader(false)
          setTrigger(false)
        }catch(e){
        console.log(e)
        setLoader(false)
      }
   }
  return (
    <>
    <div className='w-full py-8'>
               <div className='flex flex-col space-y-2'>
                      <h5 className='text-6xl font-semibold'>All services</h5>
                      <h5 className='text-slate-500  '>Check all services from this seller</h5>

                  </div>
         
         <div  className='grid grid-flow-row grid-cols-4  gap-x-1 gap-y-8 h-full w-full py-6'>
                  {products?.map((product)=>{
                      return(
                         <Card 
                            product={product}
                            trigger={trigger}
                            setTrigger={setTrigger}
                            setProduct={setProduct}
                         />
                       )
                  })}


         </div>

    </div>

    <Modal trigger={trigger}  cname="w-3/5 py-2   px-8 rounded-lg ">
            <div className='bg-white w-full  rounded-lg px-4 py-4'>
                    <div className='w-full justify-end flex '>
                           
                                <IoMdClose
                                      className='text-2xl font-light'
                                      onClick={()=>setTrigger(false)}
                               />

                     
                          
                    </div>

                    <div className='w-full flex space-x-3 overflow-y-scroll'>
                         <div className='w-1/2 flex flex-col'>
                              <div className='flex flex-col space-y-5'>
                                      <div  className='grid grid-flow-row grid-cols-2 gap-x-4 gap-y-2 w-full'>
                                              {product?.images?.slice(0,3)?.map((image)=>{
                                                  return(
                                                    <img 
                                                        src={image}
                                                        className="rounded-lg w-full"
                                                    />
                                                  )
                                              })}


                                       </div>
                                       <div className='flex flex-col space-y-3'>
                                               <h5 className='text-2xl font-semibold'>{product?.name}</h5>
                                                <p className='text-slate-800 '>
                                                  {product?.description}
                                                </p>
                                               <div className='text-lg'>
                                                <h5>Features</h5>
                                                  {product?.features?.map((text)=>{
                                                        return(
                                                          <li className='text-slate-700 '>{text?.value}</li>
                                                        )
                                                    })
                                                  }

                                               </div>
                                            

                                       </div>


                                    <div className='bg-slate-100 rounded-lg py-2 px-4 flex items-center rounded-xl shadow-sm justify-between'>
                                            <div className='flex items-center space-x-4'>
                                                  <IoDocumentTextOutline 
                                                    className='text-slate-500 text-2xl font-light'
                                                  />
                                                    <div className='flex flex-col'>
                                                        <h5 className='text-sm font-light'>Contract signing required!</h5>
                                                

                                                    </div>
                                              </div>

                                            

                                    </div>

                              </div>



                              <div className='flex w-full py-4 justify-center'>
                              {isLoading?
                                            <ClipLoader 
                                              color={"#C74A1F"}
                                              size="12"
                                            />
                                            :
                                      <button className='text-white py-2 space-x-4 px-4 text-sm rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}
                                            onClick={addTocart}
                                      >
                                            
                                            <MdOutlineShoppingCart 
                                                className='text-xl' 
                                              />
                                            <span>Add to cart</span>
                          
                                      </button>
                                  }

                              </div>
                             
                          </div>

                        <div className='w-1/3'>
                        <InlineWidget url={product?.calendly} />
                        </div>
                 

                    </div>

                </div>
          </Modal>

    </>
  )
}







const Card=({product,trigger,setTrigger,setProduct})=>{
    const currentUser=useRecoilValue(accountTypeState)
    const saved=useRecoilValue(saveTypeState)
           const [isLoading,setLoader]=useState(false)
           const [isSaving,setSave]=useState(false)
           
  
          //  const addTocart=async()=>{
          //     setLoader(true)
          //     try{
          //       //   const res=await productApi.addToCart(product,currentUser)
          //         res&&setLoader(false)
          //       }catch(e){
          //       console.log(e)
          //       setLoader(false)
          //     }
          //  }
  
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
        <>
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
                    onClick={()=>setTrigger(true) || setProduct(product)}
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
    
        </>
       )
   }