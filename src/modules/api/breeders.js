 
import { auth,db } from "../firebase";

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


export const breederApi= {
    createBreeder:async function (user,file) {
          try{
               
              const ref =doc(db,"users",user?.id)
              const {tags,...newUser}=user
              const filteredArray = tags.filter(obj => !('_isNew_' in obj));
              const newArray = filteredArray.map(({ label, value }) => ({ label, value }));
           
               if(file?.name?.length !=undefined){
                const image=await uploadFile(file)
                const {img,...rest}=newUser
                await updateDoc(doc(db,"users",user?.id),{...rest,img:image,role:"breeder",tags:tags,status:"active"})

               }else{
                await updateDoc(doc(db,"users",user?.id),{...user,role:"breeder",tags:tags})

               }
               
             
            
             
               const docSnap = await getDoc(ref);
               return {status:docSnap.exists(),data:docSnap?.data(),id:docSnap?.id}

           }catch(e){
            console.log(e)
            throw new Error(e)
           }
    },
    blockBreeder: async function (user) {
        console.log(user,"blackedusr")
        try{
            const ref =doc(db,"users",user?.id)
            await updateDoc(doc(db,"users",user?.id),{status:"blocked"})

            return true
        }catch(e){
          console.log(e)
        }
      },
      activeBreeder: async function (user) {
        try{
            const ref =doc(db,"users",user?.id)
            await updateDoc(doc(db,"users",user?.id),{status:"active"})

            return true
        }catch(e){
          console.log(e)
        }
      },
}