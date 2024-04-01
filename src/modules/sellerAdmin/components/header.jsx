import React,{useEffect,useState} from 'react'
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";


export default function Header() {
     const [currentUser,setcurrentUser]=useState({id:""})
     const user = localStorage.getItem("user");
     console.log(JSON.parse(user),"user")
  useEffect( ()=>{
      
    console.log(JSON.parse(user),"user")
    JSON.parse(user)
    setcurrentUser(JSON.parse(user))

    },[])

    console.log(currentUser,"uswr")

  return (
      <div className='w-full text-orange-600'>


           <div className='flex items-center w-full '>
                 <div className='w-1/2 flex  space-x-6'>
               
                     <div className='border py-2 px-3 rounded-lg flex w-1/2 justify-between bg-white'>
                        <input
                           placeholder='Search'
                           className='outline-none border-0 w-3/5  '
                          
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

                            

                           

                             {currentUser?.id?.length >0?
                                <div className='flex items-center space-x-2'>
                                       <Link to={"/account"}>
                                      <h5 className='rounded-full bg-orange-500 text-white font-semibold text-sm p-1 border-2 border-white lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center'
                     >
                                            {currentUser?.name?.split(' ')[0]?.slice(0,1) +currentUser?.name?.split(' ')[1]?.slice(0,1) }
                                          
                          
                                        </h5>
                                        </Link>
                              
                                     <IoIosNotificationsOutline
                                          className="text-2xl font-light text-white"
                                      />

                                </div>
                                :
                              <Link to={"/login"}>
                              <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Login</button>
                              </Link>

                              }

                     </div>
                   
           
                    
                 </div>

           </div>

        </div>
  )
}
