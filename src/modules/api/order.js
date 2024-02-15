import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"



export const orderApi= {
    create:async function (products,user,delivery,total) {
           try{
                    const  snap = await addDoc(collection(db, "orders"),{
                        products:products,
                        creator:user?.id,
                        status:"active",
                        total:total,
                        paid:false,
                        contract:"waiting",
                        time:Number(new Date()),
                        delivery
                        })
        
        
            
                    
                    const ref=doc(db,"products",snap?.id)
                    const docSnap = await getDoc(ref);
                    return {status:docSnap.exists(),id:docSnap?.id}
            }catch(e){
                console.log(e)
            }

       }

}