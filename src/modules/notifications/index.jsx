import React ,{useState,useEffect} from 'react'
import Layout from '../../layout'
import { MdShoppingCart,MdOutlineShoppingCart } from "react-icons/md";
import { db } from '../firebase';
import { collection,  onSnapshot,
      doc, getDocs,
      query, orderBy, 
      limit,getDoc,setDoc ,
     updateDoc,addDoc ,deleteDoc, where,or} from 'firebase/firestore'
import { accountTypeState, saveTypeState } from '../recoil/state';
import { useRecoilValue } from 'recoil';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { ClipLoader } from 'react-spinners';
import { calculateTime } from '../util';
import { Link } from 'react-router-dom';
export default function Notifications() {
      useEffect(() => {
         window.scrollTo(0, 0);
        }, []);
      const currentUser=useRecoilValue(accountTypeState)
      const [notifications,setNotifications]=useState([])
      const [isLoading,setLoading]=useState(false)
      const [areNotification,setAre]=useState("")


      useEffect(()=>{

      

            if(currentUser?.id?.length >0){
                 const q = query(collection(db,"notifications"),where('to', '==', currentUser?.id),orderBy('date', 'desc'));
                
                  const notifications= [];
                  const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                         notifications.push({...doc?.data(),id:doc?.id});
                        console.log(doc?.data(),"feeed")
                    });
                    setNotifications(notifications)
                  
                  }
                  notifications?.length===0 &&setAre("No notfications")
                  notifications?.length >0 &&setAre("")
          
                  
                  });
              
              }
          
          },[currentUser?.id])

          useEffect(()=>{
            const seen=async()=>{
               const result = await updateDoc(doc(db,"misc",currentUser?.id), {
                 notifications:false
               })
            }
             currentUser?.id?.length >0&& seen()
            
          },[currentUser?.id])    
  return (
    <Layout>
          <div className='h-full w-full flex px-20 py-4'>
                <div className='flex flex-col w-3/5 space-y-10'> 
                        <h5 className='text-xl font-semibold'>Notifications</h5>
                              {areNotification?.length===0&&notifications?.length ===0&&
                                    <div className='w-full flex justify-center py-10 items-center space-x-2'>
                                          <ClipLoader 
                                                color={"brown"}
                                                size="16"
                                                loading={true}
                                                />
                                          <h5 className='text-slate-700 font-light'>Loading...</h5>
                                          </div>
                                          }

                                          {areNotification?.length >0&&
                                          <div className='w-full flex justify-center py-10'>
                                                <h5 className="text-lg font-semibold">You do not have any notifications.</h5>
                                          </div>

                                      }

                        <div className='flex flex-col space-y-8'>
                            {notifications?.map((notification)=>{
                                  return(
                                    <Card
                                       notification={notification}
                                       currentUser={currentUser}
                                     />
                                  )
                            })

                            }
                        </div>


                 

                </div>
          
                
            
          </div>
    </Layout>

  )
}




const Card=({notification,currentUser})=>{
      return(
        <div className='flex w-full justify-between px-4 py-4 rounded-lg shadow-lg'>
              <Link className='w-2/3'
                to={
                  currentUser?.role==="breeder"?
                   "/admin-seller/orders"
                   :
                   "/orders"
                 }
               
               >
            
                 <div className='flex w-full items-center space-x-4'>
                       <h5 className='p-3 bg-blue-100 rounded-lg'>
                        {notification?.type==="Order update"?

                       
                           <MdOutlineShoppingCart className='text-slate-600 text-xl'/>
                           :
                           <IoChatbubbleEllipsesOutline  />

                        }
                       </h5>
                       <h5 className='font-semibold text-sm text-slate-800 flex flex-col '>
                            <span> 
                                 {notification?.type}: <span className='text-orange-700'> {notification?.msg}</span> from <span className='text-orange-700'> {notification?.from?.name}</span>
                            </span>
                           <span className='text-xs font-light text-slate-600'>
                              {calculateTime(notification?.date)}
                           </span>
                       
                        </h5>

                 </div>
                 </Link>

                 <div className='flex items-center space-x-4'>
                 
                        {notification?.type==="Order update"?  
                                   <img 
                                     src={notification?.product?.img}
                                     className="w-10 h-10 rounded-full"
                                   />
                                    :
                                    <IoChatbubbleEllipsesOutline 
                                      className='text-slate-700 text-xl'
                                     />

                            }
                      
                       <RiDeleteBinLine 
                         className='text-slate-600 text-xl'
                       />
                    
                </div>

        </div>
      )
}