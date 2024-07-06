import { auth,db } from "../firebase";
import axios from "axios";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,deleteDoc,getDocs,where,or,query}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


export const searchApi= {
    globalSearch:async function (search) {
          try{
              const q = query(
                 collection(db, 'products'),
                    or(where('categories', 'array-contains-any',[{label:search,value:search}]),
                       where('features', 'array-contains-any',[{label:search,value:search}]),
                       where('name', '==',search)
                      ),//orderBy('createdAt', 'desc')
                   );
    
                 const products= [];
      
                 const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                  
                    console.log(doc.id, " => ", doc.data());
                    products.push({...doc?.data(),id:doc?.id});
                  });
    
            if(products?.length ===0){
                const qS = query(
                    collection(db, 'users'),
                        or(where('name', '==',search),
                          where('tags', 'array-contains-any',[{label:search,value:search}])
                         ),//orderBy('createdAt', 'desc')
                       );
       
                    const sellers= [];
         
                    const querySnapshot = await getDocs(qS);
                     querySnapshot.forEach((doc) => {
                     
                       console.log(doc.id, " => ", doc.data());
                       sellers.push({...doc?.data(),id:doc?.id});
                     });

                     console.log(sellers,"selll")

                     return {items:sellers,type:"sellers"}
          
             }else{
                 
                   return {items:products,type:"products"}
             
             }
                
           }catch(e){
            console.log(e)
          }
    }
}