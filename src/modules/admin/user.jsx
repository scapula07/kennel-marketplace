import React,{useState,useEffect} from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePets,MdOutlineRateReview } from "react-icons/md";
import { Outlet } from 'react-router-dom';
import { useLocation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import UserSection from './components/userSection';

export default function User() {
    const location =useLocation()
    const userState=location?.state
    const [user,setUser]=useState({})
    



  

    useEffect(()=>{
      
        if(userState?.product?.id?.length != undefined){
          const unsub = onSnapshot(doc(db,"users",userState?.product?.id), (doc) => {
            console.log(doc.data(),"daa")
        
            setUser({...doc.data(),id:doc?.id})
           });
          }
         },[])

         console.log(user,"user")
  return (
    <div className='w-full '>
           <div className='pt-20'>

           </div>
           <div className='flex space-x-4 bg-white py-10 px-10 rounded-lg'>
                <div className='w-1/4 flex flex-col space-y-6 border-r border-orange-200'>
                     <h5>User</h5>
                   {[
                      {
                        icon:<FaRegUser />,
                        title:"Info"

                       },
                       {
                         icon:<IoCartOutline />,
                         title:"Products"
 
                        },
                        {
                           icon:<MdOutlinePets />,
                           title:"Services"
     
                        },
                        {
                            icon:<MdOutlineRateReview />,
                            title:"Reviews"
     
                        },

                       
                    
                    ].map((item)=>{
                          return(
                            <div className='flex items-center space-x-4'>
                                  <h5 className='text-sm text-slate-700 font-light'>{item?.icon}</h5>
                                  <h5 className='text-sm text-slate-700 font-light'>{item?.title}</h5>

                            </div>
                          )
                       })

                   }

                </div>

                <div className='w-3/4'>
                       <div className='flex flex-col px-4'>
                             <div className='flex space-x-8'>
                                        {user?.img?.length ==0?
                                                <div  className="w-44 h-44 rounded-full flex justify-center items-center" style={{background:"white"}}>
                                                <h5 className='rounded-full bg-orange-400 text-white text-7xl font-semibold h-36 w-36 flex items-center justify-center'>{user?.name?.slice(0,1)}</h5>
                                        </div>
                                        :
                                        <img 
                                        src={user?.img}
                                        className='w-44 h-44 rounded-full'
                                        />



                                        }
                               

                                        <div className='flex flex-col space-y-1'>
                                                    <h5 className='text-2xl font-semibold'>{user?.name}</h5>
                                                    <h5 className='text-slate-500 text-sm font-semibold'>
                                                        {user?.role ==="user"?
                                                        "Customer"
                                                        :
                                                        "Breeder"
                                                        }
                                                        </h5>

                                        </div>
   
                                  </div>

                                  <div className='w-full'>
                                    <UserSection />

                                  </div>

                       </div>
                    
                </div>

           </div>

    </div>
  )
}
