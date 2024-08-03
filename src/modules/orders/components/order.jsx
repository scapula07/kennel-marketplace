import React from 'react'
import { useState,useEffect } from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../../firebase';
import { accountTypeState } from '../../recoil/state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BeatLoader, ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { messageApi } from '../../api/message';
import Modal from '../../../components/modal';
import { AiOutlineDownload } from "react-icons/ai";
import { orderApi } from '../../api/order';
import { stripeApi } from '../../api/stripe';
import { IoMdClose } from "react-icons/io";
import Review from './review';
import Cancel from './cancel';
import { shippingApi } from '../../api/shipping';

export default function Order({order}) {
        const navigate=useNavigate()
        const currentUser=useRecoilValue(accountTypeState)
        const [isLoading,setLoader]=useState(false)
        const [loading,setLoading]=useState(false)
        const [loader,setisLoading]=useState(false)
        const [cancel,setCanceling]=useState(false)
        const [product,setProduct]=useState({images:[]})
        const [state,setContractState]=useState(order?.contract == "sent" || order?.contract == "signed")
        const [vendor,setVendor]=useState({})
        const [trigger,setTrigger]=useState(false)
        const [triggerCancel,setCancel]=useState(false)

        useEffect(()=>{
          const getShippingRate=async()=>{
              try{
                  const result =await shippingApi.getShippingRates("9cbf5727f9564801818fb3692b3a2d00")
                  console.log(result)
               }catch(e){
                  console.log(e)
               }
  
          }
          getShippingRate()
        },[order])
  


       console.log(order,"order ")
      const [open,setOpen]=useState(false)
      const startMsg=async()=>{
        setLoader(true)
          try{
            const res=await messageApi.startConversation({id:product?.creator},currentUser)
            setLoader(false)
            res&&navigate("/messages")
          }catch(e){
            setLoader(false)
            console.log(e)
          }
      }


      const signContract=async()=>{
           setLoading(true)
          try{
            const res=await orderApi.signContract(order,vendor,product,currentUser)
            
            setLoading(false)
            
          }catch(e){
            setLoading(false)
            console.log(e)
          }
      }

      const checkout=async()=>{
        setisLoading(true)
         try{
            const res = await stripeApi.checkout(vendor,product,order)
           if(res?.data?.url?.length >0){
              window.location.href =res?.data?.url;
           }
       
            setisLoading(false)
           }catch(e){
            console.log(e)
      
            setisLoading(false)

         }
      }


      const confirmDelivery=async()=>{
        setisLoading(true)
         try{
            const res = await orderApi.completeOrder(order)
            
            setisLoading(false)
           }catch(e){
            console.log(e)
          
            setisLoading(false)

         }
      }

      const cancelOrder=async(reason)=>{
        setCanceling(true)
         try{
            const res = await orderApi.cancelOrder(order,currentUser,product,reason)
            
            setCanceling(false)
            setCancel(false)
           }catch(e){
            console.log(e)
          
            setCanceling(false)

         }
      }


      console.log(product,"state")
 
  return (
    <>
    <div className="bg-slate-200 w-4/5 py-4 px-4 flex flex-col rounded-xl space-y-6"
        style={{background:"#F3F3F3"}}
    >
              <div className='flex w-full justify-between'>
                 
                   <div className='flex space-x-3'>
                      {order?.status==="active"&&
                            <h5 className='h-10 w-1 bg-orange-400'></h5>
                        }
                          {order?.status==="completed"&&
                            <h5 className='h-10 w-1 bg-green-400'></h5>
                        }
                         {order?.status==="cancelled"&&
                        <h5 className='h-10 w-1 bg-slate-400'></h5>
                     }
                        <div className='flex flex-col'>
                              <div className='flex items-center space-x-4'>
                                    <h5 className='text-lg font-semibold text-slate-600'>Order status:</h5>
                                    {order?.status==="active"&&
                                    <h5 className='bg-orange-100 text-orange-600 py-1 px-2 text-sm font-semibold'>
                                      {order?.paid==false&& order?.contract==="waiting"&& "Waiting for contract from seller" }
                                      {order?.paid==false&&  order?.contract==="sent"&& "Waiting for customer to sign the contract" }
                                      {order?.paid==false&& order?.contract==="signed"&& "Contract signed. Item is ready for checkout" }
                                      {order?.paid==true&& order?.deliveryStatus==="pending"&& "Accepted. Waiting for seller to send package" }
                                      {order?.paid==true&& order?.deliveryStatus==="sent"&& "Sent. Going to customer" }
                                      {order?.paid==true&& order?.deliveryStatus==="delivered"&& "Arrived. Waiting for customer" }
                                     
                                   
                                    </h5>
                                        }
                                  {order?.status==="completed"&&
                                    <h5 className='bg-green-100 text-green-600 py-1 px-2 text-sm font-semibold'>
                                          Completed
                                     
                                   
                                    </h5>
                                  }
                                  {order?.status==="cancelled"&&
                                    <h5 className='bg-slate-100 text-slate-600 py-1 px-2 text-sm font-semibold'>
                                          Cancelled
                                     
                                   
                                    </h5>
                                  }



                              </div>

                              <div className='flex items-center space-x-8'>
                                    <h5 className='text-sm font-light text-slate-400'>Numnber:</h5>
                                    <h5 className='text-sm font-light text-slate-400'>Date of creation:</h5>

                              </div>


                        </div>

                   </div>

                   {open?

                        <IoIosArrowDown
                        className='text-orange-400 text-2xl'
                        onClick={()=>setOpen(false)}
                        />
                        :


                        <IoIosArrowUp 
                        className='text-orange-400 text-2xl'
                        onClick={()=>setOpen(true)}
                        />


                   }
                 

              </div>



           
                <div className='flex flex-col space-y-2'>
                     {order?.products?.map((item)=>{
                        return(
                          <Product 
                            item={item}
                            order={order}
                            product={product}
                            setProduct={setProduct}
                            setVendor={setVendor}
                      />
                        )
                     })

                     }
                     

               </div>

              {open&&
                  <div className='w-full flex flex-col space-y-4'>
                         <h5 className='text-lg font-semibold text-slate-700'>Details</h5>
                         
                               <ol className='flex flex-col font-light text-slate-500 space-y-1 text-sm'>
                                  <li>Customer delivery address & service / Seller address:{order?.delivery?.city},USA </li>
                                  <li className='font-semibold'>Delivery time: will be estimated on payment .Message Seller for more information</li>
                                  <li>Customer name:{currentUser?.name}</li>
                                  <li>Seller name:{vendor?.name}</li>
                                  <li>Customer email:{currentUser?.email}</li>
                                  <li>Seller phone number:{vendor?.phone}</li>
                               </ol>
                  
                           <div className='flex flex-col space-y-4'> 
                                <div className='flex items-center w-1/2 justify-between'> 
                                     <h5 className='text-sm font-semibold text-slate-700'>Payment:</h5>
                                     <h5 className='text-semibold text-slate-900 f'>via:{order?.delivery?.payment}</h5>
                                </div>

                                <div className='flex items-center  justify-between'> 
                                     <h5  className='text-sm font-semibold text-slate-700 font-semibold'>Delivery price:</h5>
                                     <h5 className='text-light text-slate-800 w-4/5'>Will be calculated on payment.Message seller for more information</h5>
                                </div>

                                <div className='flex items-center w-1/2 justify-between'> 
                                     <h5  className='text-sm font-semibold text-slate-700'>Total price:</h5>
                                     <h5 className='text-light text-slate-600'>${order?.total}</h5>
                                </div>
                                 {state==true &&
                                      <div className='flex items-center w-1/2 justify-between'> 
                                        
                                        <Link to={order?.file}>
                                            <div className='flex bg-slate-300  items-center py-2  rounded-lg space-x-2 px-4'
                                              
                                                
                                              >
                                              <h5 className='text-slate-500 font-light text-sm'>Download Contract </h5>
                                              <AiOutlineDownload className='text-xl'
                                                />
                                            </div>
                                        </Link>
                                      
                                      </div>
                                   }
                          </div>

                  </div>

              } 


              <div className='flex flex-col w-full space-y-2'>
                       <div className='w-full flex items-center justify-between' >

                                <div className='flex items-center space-x-6 '>
                                {order?.status=="completed"&&
                                    <>
                                    {loading?
                                       <ClipLoader
                                         color='orange'
                                        />
                                         :
                                       <button className='text-white border bg-orange-700 py-2 px-6 rounded-xl' onClick={()=>setTrigger(true)}>Review</button>
                                          }
                                    </>
                                 
                                     }
                                {order?.status=="active"&&order?.contract=="signed"&&
                                    <>
                                    {loading?
                                       <ClipLoader
                                         color='orange'
                                        />
                                         :
                                         <>
                                              {order?.status=="active"&&order?.paid==false?
                                                       <button className='text-white border bg-orange-700 py-2 px-6 rounded-xl text-sm'
                                                                onClick={()=>!loader&&checkout()}
                                                              >
                                                                {loader?
                                                                <ClipLoader color='white' size={10}/>
                                                                :
                                                                "Go to checkout"
                                                                
                                                              

                                                                }
                                                              
                                                              </button>
                                                              :
                                                              <>
                                                                {order?.deliveryStatus=="delivered"&&

                                                               
                                                                      <button className='text-white border bg-orange-700 py-2 px-6 rounded-xl text-sm'
                                                                          onClick={()=>!loader&&confirmDelivery()}
                                                                        >
                                                                          {loader?
                                                                          <ClipLoader color='white' size={10}/>
                                                                              :
                                                                              "Confirm delivery"
                                                                          
                                                                        

                                                                          }
                                                                        
                                                                    </button>
                                                                         }
                                                              </>
                                                      
                                                       }
                                                            </>

                                     
                                              }
                                    </>
                                 
                                     }
                                {order?.status=="active"&&order?.contract=="sent"&&
                                    <>
                                    {loading?
                                       <ClipLoader
                                         color='orange'
                                        />
                                         :
                                       <button className='text-white border bg-orange-700 py-2 px-6 rounded-xl text-sm'
                                       onClick={signContract}
                                       >Confirm contract signature
                                       </button>
                                          }
                                    </>
                                 
                                     }
                                     {/* <button className='text-blue-400 border border-blue-400 py-2 px-6 rounded-xl text-sm'>History of order</button> */}
                                     {isLoading?
                                       <ClipLoader
                                         color='orange'
                                        />
                                       :
                                       <button className='text-blue-400 border border-blue-400 py-2 px-6 rounded-xl text-sm'
                                         onClick={startMsg}
                                       >
                                       Chat with seller
                                       </button>

                                     }
                                  

                                </div>
                                 {order?.status==="active"&&
                                            <button className='text-orange-400 border border-orange-400 py-2 px-6 rounded-xl text-sm' onClick={()=>!cancel&&setCancel(true)}>
                                              {!cancel?
                                              "Cancel"
                                              :
                                              <BeatLoader size={8} color="orange" />

                                              }
                                            
                                              </button>

                                 }
                        

                       </div>
                       <h5 className='text-slate-500 '>All the details about deal and contract you can discuss in chat with seller</h5>

              </div>
            


    </div>
    <Modal trigger={trigger}  cname="w-1/2 py-2   px-8 rounded-lg ">
            <div className='bg-white w-full  rounded-lg px-4 py-4'>
                    <div className='w-full justify-end flex '>
                           
                                <IoMdClose
                                      className='text-2xl font-light'
                                      onClick={()=>setTrigger(false)}
                               />

                     
                          
                    </div>

                 <div>
                     <Review
                       product={product}
                       setTrigger={setTrigger}
                     />



                 </div>

            </div>


    </Modal>

     <Modal trigger={triggerCancel}  cname="w-1/2 py-2   px-8 rounded-lg ">
              <div className='bg-white w-full  rounded-lg px-4 py-4 space-y-4'>
                      <div className='w-full justify-end flex '>
                            
                                  <IoMdClose
                                        className='text-2xl font-light'
                                        onClick={()=>setCancel(false)}
                                />

                      
                            
                      </div>

                  <div>
                      <Cancel 
                        product={product}
                        cancelOrder={cancelOrder}
                        cancel={cancel}
                      />



                  </div>

              </div>


      </Modal>

    </>
  )
}







const Product=({item,order,product,setProduct,setVendor})=>{

    useEffect(()=>{
     
     if(item?.id?.length != undefined){
       const unsub = onSnapshot(doc(db,item?.type==="product"?"products":"services",item?.id), (doc) => {
         console.log(doc.data(),"daa")
     
         setProduct({...doc.data(),id:doc?.id})
        });
       }

       if(order?.vendor?.length != undefined){
        const unsub = onSnapshot(doc(db,"users",order?.vendor), (doc) => {
          console.log(doc.data(),"daa")
      
          setVendor({...doc.data(),id:doc?.id})
         });
        }
      },[])

    

      
  
      console.log(product?.images[0],"prod")
        return(
      <div className='flex w-full bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
          <img 
              src={product?.images[0]}
            className="w-20 h-20"
          />
  
          <div className='flex w-full justify-between'>
              <div className='flex flex-col w-2/5'>
                    <div className='flex flex-col space-y-3'>
                         <h5 className='text-lg text-slate-700 font-light'>{product?.name}</h5>
                         <h5 className='text-sm text-slate-500 '>{product?.description?.slice(0,50)}...</h5>
                    </div>
  
              
              </div>

              <div className='flex items-center justify-between w-3/5'>
                            <div className='flex flex-col w-1/4 items-center space-y-1'>
                                 <h5 className='text-slate-500 font-light text-sm'>Price</h5>
                                 <h5 className='text-slate-800 font-semibold text-sm'>${product?.price}</h5>
                               
                            </div>
                            <div className='flex flex-col w-1/4 items-center space-y-1'>
                                 <h5 className='text-slate-500 font-light text-sm' >Quantity</h5>
                                 <h5 className='text-slate-800 font-semibold text-sm'>{item?.qty}</h5>
                               
                            </div>
                            <div className='flex flex-col w-1/4 items-center space-y-1'>
                                 <h5 className='text-slate-500 font-light text-sm'>Summary</h5>
                                 <h5 className='text-slate-800 font-semibold text-sm'>$ {order?.total}</h5>
                               
                            </div>

                            <div className='flex flex-col w-1/4 items-center space-y-1'>
                                 <h5 className='text-slate-500 font-light text-sm'>Contract</h5>
                                 {order?.contract=="waiting"&&
                                 <h5 className='text-orange-700 font-semibold text-sm'>Not sent
                                 </h5>
                                 }
                                  {order?.contract=="sent"&&
                                 <h5 className='text-orange-700 font-semibold text-sm'>Sent
                                 </h5>
                                 }

                              {order?.contract=="signed"&&
                                 <h5 className='text-orange-700 font-semibold text-sm'>Signed
                                 </h5>
                                 } 
                               
                            </div>
                    </div>
            
  
            <div>
            </div>
  
  
          </div>
          </div>
        )
  }