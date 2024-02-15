import React from 'react'
import { useState,useEffect } from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../../firebase';
import { accountTypeState } from '../../recoil/state';
import { useRecoilValue } from 'recoil';


export default function Order({order}) {
       console.log(order,"order ")
      const [open,setOpen]=useState(false)
  return (
    <div className="bg-slate-200 w-4/5 py-4 px-4 flex flex-col rounded-xl space-y-6"
        style={{background:"#F3F3F3"}}
    >
              <div className='flex w-full justify-between'>
                 
                   <div className='flex space-x-3'>
                        <h5 className='h-10 w-1 bg-orange-400'></h5>
                        <div className='flex flex-col'>
                              <div className='flex items-center space-x-4'>
                                    <h5 className='text-lg font-semibold text-slate-600'>Order status:</h5>
                                    <h5 className='bg-orange-100 text-orange-600 py-1 px-2 text-sm font-semibold'>Waiting for contract from seller</h5>

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



           
                <div className='flex flex-col'>
                     {order?.products?.map((item)=>{
                        return(
                          <Product 
                            item={item}
                      />
                        )
                     })

                     }
                     

               </div>

              {open&&
                  <div className='w-full flex flex-col space-y-4'>
                         <h5 className='text-lg font-semibold text-slate-700'>Details</h5>
                         
                               <ol className='flex flex-col font-light text-slate-500 space-y-1 text-sm'>
                                  <li>Customer delivery address & service / Seller address:{order?.delivery?.city} </li>
                                  <li>Delivery time:</li>
                                  <li>Customer name:</li>
                                  <li>Seller name:</li>
                                  <li>Customer email:</li>
                                  <li>Customer phone number:</li>
                               </ol>
                  
                           <div className='flex flex-col space-y-4'> 
                                <div className='flex items-center w-1/2 justify-between'> 
                                     <h5 className='text-lg font-semibold text-slate-700'>Payment:</h5>
                                     <h5 className='text-semibold text-slate-900 f'>via:{order?.delivery?.payment}</h5>
                                </div>

                                <div className='flex items-center w-1/2 justify-between'> 
                                     <h5  className='text-lg font-semibold text-slate-700 '>Delivery price:</h5>
                                     <h5 className='text-light text-slate-400'>$</h5>
                                </div>

                                <div className='flex items-center w-1/2 justify-between'> 
                                     <h5  className='text-lg font-semibold text-slate-700'>Total price:{order?.total}</h5>
                                     <h5 className='text-light text-slate-400'>${order?.total}</h5>
                                </div>
                          </div>

                  </div>

              } 


              <div className='flex flex-col w-full space-y-2'>
                       <div className='w-full flex items-center justify-between' >
                                <div className='flex items-center space-x-6 '>
                                     <button className='text-blue-400 border border-blue-400 py-2 px-6 rounded-xl'>History of order</button>
                                     <button className='text-blue-400 border border-blue-400 py-2 px-6 rounded-xl'>Chat with seller</button>

                                </div>

                                <button className='text-orange-400 border border-orange-400 py-2 px-6 rounded-xl'>Cancel</button>

                       </div>
                       <h5 className='text-slate-500 '>All the details about deal and contract you can discuss in chat with seller</h5>

              </div>
            


    </div>
  )
}







const Product=({item})=>{
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
      <div className='flex w-full bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
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
  
  
          </div>
          </div>
        )
  }