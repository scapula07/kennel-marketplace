import React,{useEffect,useState} from 'react'
import { MdOutlineShoppingCart,MdOutlineClose } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-b.png"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { onSnapshot,doc } from 'firebase/firestore'
import { db } from '../../modules/firebase';
import { saveTypeState ,accountTypeState,preOrdersTypeState} from '../../modules/recoil/state';
import { useRecoilState ,useRecoilValue} from 'recoil';
import { searchApi } from '../../modules/api/search';
import { useNavigate } from 'react-router-dom';
import { MdBlock} from "react-icons/md";

import { IoMdMenu } from "react-icons/io";

export default function MobileHeader({setMenu,isMenu}) {

  const currentUser=useRecoilValue(accountTypeState)
  const [misc,setMisc]=useState({})
  const [saved,setSaved]=useRecoilState(saveTypeState)
  const [preorders,setPreorders]=useRecoilState(preOrdersTypeState)
  const user = localStorage.getItem("user");
  const [isLoading,setLoading]=useState(false)
  
  const currentURL = window.location.href;
  const parts = currentURL?.split('/');
  const lastPart = parts[parts.length - 1];

  const part =`${"/" +lastPart}`
  const [active,setActive]=useState(part)
  const [search,setSearch]=useState("")
  const [unseen,setUnseen]=useState()

  const navigate=useNavigate()

   
  useEffect(()=>{
    if(currentUser?.id?.length >0){
      const ref =doc(db,"misc",currentUser?.id)
      const unsub = onSnapshot(ref, (doc) => {
    
      setUnseen(doc?.data())
      });
    }
   },[currentUser])

useEffect(()=>{

  if(JSON.parse(user)?.id?.length >0){
     const ref =doc(db,"misc",JSON.parse(user)?.id)
     const unsub = onSnapshot(ref, (doc) => {
     setMisc(doc?.data())
     setSaved(doc?.data()?.saved)
     setPreorders(doc?.data()?.preOrder)
     });
   }
},[])



  return (
    <div className='w-full flex items-center px-2 py-2 justify-between'>
         <img 
           src={logo}
           className=""
         />

         <div className='w-1/2 flex items-center justify-end space-x-4'>
               {currentUser?.id?.length >0&&
                     <Link to={"/cart"}
                                  state={{
                                    products:misc?.cart
                                }}>
                               <div className='flex'>
                                  <MdOutlineShoppingCart 
                                      className='text-4xl text-gray-700' 
                                  />
                                  {misc?.cart?.length >0&&
                                      <h5 className='text-xs bg-orange-600 rounded-full flex items-center justify-center h-4 w-4 text-white '>{misc?.cart?.length}</h5>
                                    }                       
                                 </div> 
                       </Link>
                    }
                  <Link to={"/account"}>
                                {currentUser?.img?.length ===0?
                                      <h5 className='rounded-full bg-orange-400 text-white font-semibold text-sm p-1 border-2 border-white lg:w-8 lg:h-8 w-10 h-10 flex items-center justify-center'
                                        >
                                          {currentUser?.name?.slice(0,1)}                                           
                                      </h5>
                                        :
                                        <img 
                                          src={currentUser?.img}
                                          className="rounded-full lg:w-8 lg:h-8 w-10 h-10"
                                        />
                                    }      
                      </Link>
              {isMenu?
                 <MdOutlineClose
                      className='text-4xl text-gray-700'
                      onClick={()=>setMenu(false)}
                   />
                   :
                   <IoMdMenu
                   className='text-4xl text-gray-700'
                   onClick={()=>setMenu(true)}
                />

              }
         
         </div>
        
    </div>
  )
}
