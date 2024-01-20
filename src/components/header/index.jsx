import React,{useEffect,useState} from 'react'
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-b.png"
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
      <div className='w-full '>


           <div className='flex items-center w-full px-10'>
                 <div className='w-1/2 flex justify-center space-x-6'>
                    <div>
                        <img 
                          src={logo}
                          className="w-26 h-10"
                        />

                    </div>
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
                             {currentUser?.id?.length >0?
                                <div className='flex items-center space-x-2'>
                                       <Link to={"/account"}>
                                      <h5 className='rounded-full bg-blue-600 text-white font-semibold text-sm p-1 border-2 border-white lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center'
                     >
                                            {currentUser?.name?.split(' ')[0]?.slice(0,1) +currentUser?.name?.split(' ')[1]?.slice(0,1) }
                                          
                          
                                        </h5>
                                        </Link>
                                        <Link to={"/messages"}>
                                          <IoChatbubbleEllipsesOutline 
                                              className="text-2xl font-light text-slate-500"
                                          />
                                     </Link>
                                     <IoIosNotificationsOutline
                                          className="text-2xl font-light text-slate-500"
                                      />

                                </div>
                                :
                              <Link to={"/login"}>
                              <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Login</button>
                              </Link>

                              }
                             
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
