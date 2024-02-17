import React,{useEffect,useState} from 'react'
import Order from './components/order'
import { ClipLoader } from 'react-spinners';
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { messageApi } from '../api/message';


export default function Active() {
        const currentUser=useRecoilValue(accountTypeState)
        const [orders,setOrders]=useState([])
        const [areContacts,setContacts]=useState("")
        const [isLoading,setLoader]=useState(false)
          console.log(currentUser,"user active")
        useEffect(()=>{
       if(currentUser?.id?.length >0){
            const q = query(collection(db, "orders"),where('creator', '==', currentUser?.id),where("status", "==", "active"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const products = []
                  querySnapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })

                  });
                  products?.length===0 &&setContacts("No contact")
                  products?.length >0 &&setContacts("")


               setOrders(products)
            });

          }
          


        
         
        },[])

 

        
  return (
    <div className='w-full flex flex-col space-y-4'>
          {orders?.map((order)=>{
              return(
                <Order
                   order={order}
          
                 />
              )
          })

          }

                          {orders?.length ===0&&areContacts?.length ==0&&
                                <div className='w-full flex justify-center py-5 '>
                                    <ClipLoader 
                                          color={"orange"}
                                          loading={true}
                                    />
                                </div>
                                }
                                                    
                                {orders?.length ===0&&areContacts?.length >0&&
                                <div className='w-full flex justify-center  py-5'>
                                <h5 className="text-sm">No active orders</h5>
                                </div>
                                } 
        

    </div>
  )
}
