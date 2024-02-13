import React,{useEffect,useState} from 'react'
import Order from './components/order'
import { ClipLoader } from 'react-spinners';
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"



export default function Active() {
        const currentUser=useRecoilValue(accountTypeState)
        const [orders,setOrders]=useState([])
          
        useEffect(()=>{
          if(currentUser?.id?.length >0){
            const q = query(collection(db, "orders"),where('creator', '==', currentUser?.id));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const products = []
                  querySnapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })

                  });


             setOrders(products)
            });

          }
          


        
         
        },[])

        
  return (
    <div className='w-full flex flex-col'>
          {orders?.map(()=>{
              return(
                <Order />
              )
          })

          }
        

    </div>
  )
}
