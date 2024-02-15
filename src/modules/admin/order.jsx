import React,{useState,useEffect} from 'react'
import { useLocation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import Select from "react-select";
import { IoIosNotifications } from "react-icons/io";
import { FaHtml5 } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

export default function Order() {
    const [order,setOrder]=useState({images:[]})
    const location =useLocation()
  
    const id=location?.state
  
    console.log(id)
  
    useEffect(()=>{
      
        if(id?.length != undefined){
          const unsub = onSnapshot(doc(db,"orders",id), (doc) => {
            console.log(doc.data(),"daa")
        
            setOrder({...doc.data(),id:doc?.id})
           });
          }
         },[])
  
       
  return (
    <div className='w-full'>
                <div className='flex flex-col space-y-3'>
                    <h5 className='text-white font-light text-sm'>Admin/Order</h5>
                    <h5 className='text-lg font-semibold text-white'></h5>

                </div>

                <div className='w-full rounded-lg py-6 px-4 flex justify-center'>
                       <div className='w-4/5 bg-white  rounded-xl px-6 py-8'>
                            <div className='flex flex-col border-b pb-4'>
                                    <h5 className='text-lg  text-slate-700'>Order Details</h5>
                                    <h5 className='text-sm font-light  text-slate-700'>Order no:</h5>
                             </div>


                             <div className='flex w-full justify-between py-6 border-b '>
                                     <Product />

                                    <button className='py-2 px-6 bg-orange-500 rounded-lg text-white text-xs '>Message customer</button>
               
                             </div>

                             <div className='flex w-full justify-between py-4'>
                                   <div className='w-1/4'>
                                      <Tracker />
                                   </div>

                                    <div className='w-2/4 flex flex-col px-4 space-y-8'>
                                          <div className=''>
                                              <h5 className='text-slate-500 font-semibold'>Customer details</h5>
                                            
                                          </div>
                                         
                                          <div className=''>
                                              <h5 className='text-slate-500 font-semibold'>Delivery details</h5>
                                            
                                          </div>

                                          <div className=''>
                                              <h5 className='text-slate-500 font-semibold'>Payment status</h5>
                                            
                                          </div>

                                          <div className=''>
                                              <h5 className='text-slate-500 font-semibold'>Upload contract</h5>
                                            
                                          </div>
                                    </div>

                                      <div className='w-1/4'>
                                            <h5 className='text-slate-500 font-semibold'>Order summary</h5>
                                    
                                    </div>

                             </div>
                        

                       </div>
                       

                </div>


    </div>
  )
}




const Product=()=>{
      return(
        <div>

        </div>
      )
}





const Tracker=()=>{
     return(
        <div className='w-full flex flex-col py-'>
            <h5 className='text-slate-500 font-semibold'>Update Tracking</h5>
                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                              <IoIosNotifications
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order received</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>

                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                              <IoDocumentTextSharp 
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Contract sent</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>


                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                             <IoDocumentTextSharp 
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Contract signed</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>



                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                             <input
                               type={"checkbox"}
                              />
                             {/* <FaCartShopping
                                className='text-2xl text-slate-600'
                               /> */}
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order transmited to courier</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>

                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                          
                             <IoMdCheckmark
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order delivered</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-3 w-0.5 border'></h5>

                </div>
        </div>
        
     )
}