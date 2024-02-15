import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"




export const paymentApi= {
    addPayment:async function (user,payments) {
          try{
       

            const ref =doc(db,"users",user?.id)
            const docSnap = await getDoc(ref);
            console.log(payments)
               await updateDoc(doc(db,"users",user?.id), {
                payments:[...docSnap?.data()?.payments,...payments]
                })

                return true

          }catch(e){
            console.log(e)
          }
    }

}