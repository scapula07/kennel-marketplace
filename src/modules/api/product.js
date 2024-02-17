 
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

export const productApi= {
    create:async function (product,user,files) {
          console.log(files,"file")
         try{
              let directory=[]
              await Promise.all(files?.map(async(file)=>{
                  const img=await uploadFile(file)
                  directory?.push(img)
              }))

              console.log(directory,"diretc")

            const  snap = await addDoc(collection(db, "products"),{
               ...product,
                 images:directory,
                creator:user?.id
               })


    
             
           const ref=doc(db,"products",snap?.id)
           const docSnap = await getDoc(ref);
           return {status:docSnap.exists(),id:docSnap?.id}


          }catch(e){
            console.log(e)
            throw new Error(e);
         }
     },
    addToCart:async function (product,user) {
          try{
            const ref =doc(db,"misc",user?.id)
            const docSnap = await getDoc(ref);
               await updateDoc(doc(db,"misc",user?.id), {
                   cart:[...docSnap?.data()?.cart,{id:product?.id,qty:1,price:product?.price}]
                })

               return true
 

           }catch(e){
              console.log(e)
           }

      },
      removeFromCart:async function (product,user) {
        try{
          const ref =doc(db,"misc",user?.id)
          const docSnap = await getDoc(ref);
          console.log(docSnap?.data()?.cart,"old")
          const newCart=docSnap?.data()?.cart?.filter(i=>i?.id !=product?.id)
          console.log(newCart,"new")
             await updateDoc(doc(db,"misc",user?.id), {
                 cart:[...newCart]
              })

             return newCart


         }catch(e){
            console.log(e)
         }

    },
      save:async function (product,user) {
        try{
          const ref =doc(db,"misc",user?.id)
          const docSnap = await getDoc(ref);
             await updateDoc(doc(db,"misc",user?.id), {
                 saved:[...docSnap?.data()?.saved,product?.id]
              })

             return true


         }catch(e){
            console.log(e)
         }

    },
    editProduct:async function (product,file) {
      try{
          // const img=await uploadFile(file)

       

          const ref =doc(db,"users",product?.id)
          const docSnap = await getDoc(ref);
             await updateDoc(doc(db,"products",product?.id),product)
         
              return true

          }catch(e){
        console.log(e)
      }
  }
}

