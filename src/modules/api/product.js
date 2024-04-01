 
import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,deleteDoc,getDocs,where,or,query,orderBy}  from "firebase/firestore";
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
            const {features,...rest}=product
            const filteredArray = features.filter(obj => !('_isNew_' in obj));
            const newArray = filteredArray.map(({ label, value }) => ({ label, value }));
            console.log(newArray,"array")

            const  snap = await addDoc(collection(db, "products"),{
               ...rest,
                 images:directory,
                 features:newArray,
                 creator:user?.id,
                 createdAt:new Date()
                 
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
                console.log(docSnap?.data()?.cart?.some(item=>item?.id==product?.id),"here")
                if(docSnap?.data()?.cart?.some(item=>item?.id==product?.id)){
                      return true
                    }else{
                        await updateDoc(doc(db,"misc",user?.id), {
                      cart:[...docSnap?.data()?.cart,{id:product?.id,qty:1,price:product?.price,vendor:product?.creator}]
                    })

               return true

                }
             
 

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
    editProduct:async function (product,files,urls) {
      try{
          // const img=await uploadFile(file)

          const ref =doc(db,"users",product?.id)
          let directory=[]
          if(urls?.length >0){
              const {images,...rest}=product
              await Promise.all(files?.map(async(file)=>{
                  const img=await uploadFile(file)
                  directory?.push(img)
              }))
              const docSnap = await getDoc(ref);
              await updateDoc(doc(db,"products",product?.id),
               {
                ...product,
                images:[...images,...directory],
                }
              )
          
               return true
                    
          }else{
             const docSnap = await getDoc(ref);
              await updateDoc(doc(db,"products",product?.id),product)
        
             return true

          }
      
         

          }catch(e){
             console.log(e)
      }
      },
      filterProducts:async function (filters) {
        try{
          const q = query(
            collection(db, 'products'),
              or(where('category', 'array-contains-any', filters),
                where('features', 'array-contains-any', filters)
               ),orderBy('createdAt', 'desc')
             );

             const products= [];
  
             const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              
                console.log(doc.id, " => ", doc.data());
                products.push({...doc?.data(),id:doc?.id});
              });

              return products

        }catch(e){
          console.log(e)
        }
    

      },
      findPrice:async function (prices) {
        try{
          const q = query(
            collection(db, 'products'),
              or(where('price', '>', prices?.low),
                where('features', '<', prices?.high)
                ),orderBy('createdAt', 'desc')
             );

             const products= [];
  
             const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
              
                console.log(doc.id, " => ", doc.data());
                products.push({...doc?.data(),id:doc?.id});
              });

              return products

        }catch(e){
          console.log(e)
        }
    

      },
      deleteProduct:async function (product) {
           try{
        
              await deleteDoc(doc(db,"products",product?.id));
              return true
             }catch(e){
                console.log(e)
            }
      },
}

