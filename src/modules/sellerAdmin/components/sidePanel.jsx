import React from 'react'
import logo from "../../../assets/logo-b.png"
import { MdArrowDropDown,MdArrowDropUp } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { useState } from 'react';
import { MdKeyboardArrowDown ,MdKeyboardArrowUp,MdOutlineCleaningServices} from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { Link } from 'react-router-dom';
import { SiDocsify } from "react-icons/si";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { accountTypeState } from '../../recoil/state';
import { useRecoilValue } from 'recoil';
import { MdBookmarkBorder } from "react-icons/md";

export default function SidePanel() {
     const currentUser =useRecoilValue(accountTypeState)
     const [active,setActive]=useState(currentUser?.status==="pending"?"kyc":"")
    
  return (
    <div className='w-full bg-slate-100 h-full rounded-xl py-6 px-4 overflow-y-scroll no-scrollbar'>
          <div className='flex flex-col space-y-16'>
                <div className='w-full space-y-3 px-4'>
                     <img 
                        src={logo}
                        className="w-26 h-8"
                     />
                    <h5 className='h-1 w-full border-b border-slate-500'></h5>

                </div>


                   <div className='flex flex-col px-4 space-y-6'>
                        {[
                            {
                                title:"Overview",
                                icon:<IoGrid/>,
                                link:""

                            },
                           
                           
                            {
                             title:"Products",
                             icon:<IoBagHandleSharp />,
                             items:[
                                {
                                 name:"Add new product",
                                 link:"new-product"

                                 },
                                {
                                    name:"Your Products",
                                    link:"products"
   
                                }
                               ]


                              },
                              {
                                title:"Litters",
                                icon:<MdBookmarkBorder />,
                                items:[
                                   {
                                    name:"Upcoming litter",
                                    link:"litter"
   
                                    },
                                   {
                                       name:"Pre-orders",
                                       link:"preorders"
      
                                   }
                                  ]
   
   
                                 },
                              {
                                title:"Services",
                                icon:<MdOutlineCleaningServices />,
                                items:[
                                   {
                                    name:"Add a service",
                                    link:"add-service"
   
                                    },
                                   {
                                       name:"Your services",
                                       link:"services"
      
                                   }
                                  ]
   
   
                                 },
                                {
                                  title:"Orders",
                                  icon:<IoCart />,
                                  items:[
                                    {
                                      name:"Manage orders",
                                      link:"orders"
    
                                    }
                                    ]
   
   
                              },
                              {
                                  title:"Messages",
                                  icon:<BiSolidMessageSquareDots />,
                                  link:"/messages"
                              },
                              
                              {
                                title:"KYC",
                                icon:<VscWorkspaceUnknown />,
                                link:"kyc"

                              },
                              {
                                title:"Pricing",
                                icon:<IoMdPricetags />,
                                link:"pricing"
  
                               },
                            {
                              title:"Guide",
                              icon:<SiDocsify />,
                              link:"guide"

                             }

                           ].map((item,index)=>{
                              return(
                                <>
                                {currentUser?.status ==="pending"?

                                ["KYC","Guide"]?.includes(item?.title)&&
                                  <Card 
                                    item={item}
                                    index={index}
                                    active={active}
                                    setActive={setActive}
                                   />
                                   :
                                   <Card 
                                   item={item}
                                   index={index}
                                   active={active}
                                   setActive={setActive}
                                  />


                                }
                                
                                </>
                              
                              )
                          })

                        }
                        

                   </div>

          </div>

    </div>
  )
}



const Card=({item,index,active,setActive})=>{
       const [drop,setDrop]=useState(true)
       const colors=[
        "text-blue-300",
        "text-slate-300",
        "text-orange-300",
        "text-green-300 ",
        "text-red-300",
        "text-purple-300",
        "text-black",
        "text-rose-600"
      ]
      return(
        <div className='flex flex-col w-full'>
               <div className='flex items-center w-full justify-between'>
               <Link to={item?.link}
                    className={
                    `${active ==item?.link&&item?.link !=undefined ?"w-full px-4 bg-orange-400 rounded-sm shadow py-2":
                       "w-full px-4 hover:bg-orange-400 rounded-sm hover:shadow hover:py-2"}`
                      }
                      onClick={()=>setActive(item?.link)}
               >
                     <div className='flex items-center space-x-3'>
                          <h5 className={` text-lg ${colors[index]}`}>{item?.icon}</h5>
                          <h5 className='text-slate-800 text-sm font-light'>{item?.title}</h5>

                      </div>
                  </Link>
                      {["Products","Litters","Orders","Users","Services"]?.includes(item?.title)&&
                              <>
                              {drop?
                                  <MdKeyboardArrowUp
                                  className='text-2xl text-slate-700 '
                                  onClick={()=>setDrop(false)}
                                  />
                                      :
                                  <MdKeyboardArrowDown 
                                      className='text-2xl text-slate-700 '
                                      onClick={()=>setDrop(true)}
                                  />
                                  
                                  
  
                              }
                        </>

                      }
                 
                    
                     

               </div>
               {["Products","Litters","Orders","Users","Services"]?.includes(item?.title)&&
                              <>
                 {drop&&
                    <div className='flex-col flex px-8 space-y-2 py-4'>
                         {item?.items?.map((tag)=>{
                              return(
                                <Link to={tag?.link}
                                   className={
                                    `${active ==tag?.link ?"w-full px-3 bg-orange-400 rounded-sm shadow py-2":
                                     "w-full px-3 hover:bg-orange-400 rounded-sm hover:shadow hover:py-2"}`
                                    }
                                    onClick={()=>setActive(tag?.link)}
                                >
                                     <h5 className='text-xs text-slate-700 font-light'>{tag?.name}</h5>
                                </Link>

                              )
                         })

                         }


                    </div>
                }
                </>
                } 
        </div>

      )
}