import React from 'react'
import cover from "../../../assets/cover.png"
import breeder from "../../../assets/breeder.png"
import { MdOutlineStar,MdOutlineShoppingCart  } from "react-icons/md";
import {FiArrowRight} from "react-icons/fi"


export default function Cover() {
  return (
    <div className='flex flex-col w-full'>
          <div className='w-full flex flex-col '>
                <img 
                src={cover}
                className="w-full h-56"
                />
             <div className=' px-28 flex items-center '>

                   <img 
                      src={breeder}
                      className="w-56 h-56 rounded-full -mt-20 p-3"
                      style={{background:"white"}}
                   />

                    <div className='flex items-center -mt-12'>
                        <h5 className='text text-slate-500'>Seller rating 4.8 of 5</h5>
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


          <div className='w-full flex justify-end w-full px-28 -mt-20'>

                   <div className='flex  space-x-4 w-1/3'>
                            <button className='text-white py-2 px-4 rounded-lg  w-full' style={{background:"#C74A1F"}}>

                            <span>Message seller</span>

                            </button>

                            <button className='text-blue-600 py-3 space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center w-full border border-blue-600 ' >
                                <span>Copy sharing link</span>
                                <FiArrowRight
                                    className='text-xl' 
                                />
                        

                            </button>

                    </div>

          </div>





    </div>
  )
}
