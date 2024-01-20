import React from 'react'
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
      <div className='w-full '>


           <div className='flex items-center w-full px-10'>
                 <div className='w-1/2 flex justify-center'>
                     <div className='border py-2 px-3 rounded-lg flex w-1/2 justify-between'>
                        <input
                           placeholder='Search'
                           className='outline-none border-0 w-3/5'
                         />
                        <FiSearch
                          className='text-slate-600'
                         />

                     </div>


                 </div>




                 <div className='flex items-center w-1/2 justify-end' >
                     <div className='flex items-center justify-between w-3/4'>
                            {[{text:"Home",link:"/"},{text:"Marketplace",link:"/market"},{text:"Sellers",link:"/sellers"}].map((item)=>{
                                return(
                                   <Link to={item?.link}>
                                       <h5 className=' font-light hover:font-semibold hover:text-orange-800'>{item?.text}</h5>
                                   </Link>
                          

                                )
                              })

                             }

                             <button className='text-white py-1.5 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>I'm a breader</button>
                             <Link to={"/login"}>
                             <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Login</button>
                             </Link>
                             
                             <Link to={"/cart"}>
                             <MdOutlineShoppingCart 
                                className='text-2xl' 
                             />
                            </Link>


                     </div>
                   
           
                    
                 </div>

           </div>

        </div>
  )
}
