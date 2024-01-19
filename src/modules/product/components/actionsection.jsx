import React from 'react'
import { FaRegBookmark,FaRegStar } from "react-icons/fa";
import { MdOutlineStar,MdOutlineShoppingCart  } from "react-icons/md";
import breeder from "../../../assets/breeder2.png"
import { FiArrowRight } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Actionsection() {
  return (
    <div className='flex w-1/2 flex-col py-6 space-y-6'>

         <div className='flex flex-col'>
                <div className='flex items-center justify-between'> 
                    <h5 className='font-semibold text-3xl'>35 USD</h5>
                    <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full'>
                            <FaRegBookmark 
                                className='text-blue-600 text-xl'
                            />

                        </h5>
                </div>

               <div className='flex items-center'>
                  <h5 className='text-sm text-slate-500'>Rating 4.8 of 5</h5>
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


         <div className='flex flex-col space-y-4'>
                    <div className='bg-white rounded-lg py-3 px-4 flex items-center rounded-xl shadow-sm justify-between'>
                            <div className='flex items-center space-x-4'>
                                    <img 
                                        src={breeder}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className='flex flex-col'>
                                        <h5 className='text-xl font-semibold text-slate-600'>Richard Williamson</h5>
                                        <h5 className='text-sm text-slate-400 font-light'>Dog breeder</h5>

                                    </div>
                              </div>

                              <FiArrowRight
                                className='text-blue-500 text-3xl '
                               />


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
              {["Large (L) treats pack (5kg)","Medium (M) treats pack (3kg)","Small (S) treats pack (1kg)"].map((text)=>{
                 return(
                     <div className='rounded-full border px-4 py-2 flex items-center space-x-3'> 
                       <input 
                          type={"radio"}
                       />

                       <h5 className='font-light text-slate-700 text-lg'>{text}</h5>
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
                            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                        
                                        <MdOutlineShoppingCart 
                                            className='text-xl' 
                                        />
                                        <span>Add to cart</span>

                            </button>

                            <button className='text-blue-600 py-3 space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center w-full border border-blue-600 ' >
                                <span>Send message to seller</span>
                                <FiArrowRight
                                    className='text-xl' 
                                />
                        

            </button>

                    </div>

         </div>


    </div>
  )
}
