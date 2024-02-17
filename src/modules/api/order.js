import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


const uploadFile=async(file)=>{
    console.log("Uploading")
    const storage = getStorage();
    const fileId=Math.random().toString(36).substring(2,8+2);
    const storageRef = ref(storage, `/${fileId}`);
    console.log(storageRef,"shote")
    const snapshot=await uploadBytes(storageRef, file)

    return `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`

}

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

       },
       uploadContract:async function (order,file) {
            try{
                const url=await uploadFile(file)
                 console.log(url,"uu")

                const ref =doc(db,"order",order?.id)
                const docSnap = await getDoc(ref);
                 const res=  await updateDoc(doc(db,"orders",order?.id), {
                        contract:"sent",
                        file:url
                    })
                    console.log(res,"resss")
    
                    return true

            }catch(e){
                console.log(e)
            }
       },
       signContract:async function (order) {
        try{
             const ref =doc(db,"order",order?.id)
             const docSnap = await getDoc(ref);
             const res=  await updateDoc(doc(db,"orders",order?.id), {
                    contract:"signed",
                })
  

                return true

        }catch(e){
            console.log(e)
        }
   }

}