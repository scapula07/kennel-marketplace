import React ,{useState,useEffect} from 'react'
import comb from "../../assets/comb.png"
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";

import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';



export default function Products({saved}) {
       
  return (
    <div className='w-full'>
         
         <div  className='grid grid-flow-row grid-cols-4  gap-4 gap-y-8 h-full w-full py-6'>
                  {saved?.map((save)=>{
                      return(
                         <Card
                           id={save} 
                         />
                       )
                  })}


         </div>

    </div>
  )
}





const Card=({id})=>{
  const [product,setProduct]=useState({images:[]})
  useEffect(()=>{
   
   if(id?.length != undefined){
     const unsub = onSnapshot(doc(db,"products",id), (doc) => {
       console.log(doc.data(),"daa")
   
       setProduct({...doc.data(),id:doc?.id})
      });
     }
    },[])
    return(
      <div className='flex flex-col w-full space-y-4'>
          <div className='relative h-72 w-full'>
              <img 
                src={product?.images[0]}
                className="w-full h-full rounded-lg"
 
              />
              <div className='absolute top-0 z-30 w-full h-full'>
                    <div className='w-full h-full flex flex-col justify-between items-end px-4 py-2'>
                       <h5 className='bg-green-800 flex items-center justify-center p-1.5 rounded-full '>
                           <FaBookmark 
                           className='text-white'
                           />
 
                       </h5>
                       <h5 className='bg-white flex items-center p-2 rounded-full'>
                         {[1,2,3,4,5].map(()=>{
                           return(
                              <MdOutlineStar 
                                className='text-yellow-300 '
                              />
                           )
                         })
 
                         }
 
                       </h5>
 
                    </div>
 
              </div>
 
          </div>
 
          <div className='flex flex-col space-y-3'>
             <h5 className='text-slate-500 text-xl font-semibold'>{product?.name}</h5>
             <h5 className='text-slate-400 text-sm '>{product?.description}</h5>
             <h5 className=' text-2xl font-semibold'>{product?.price} USD</h5>
 
          </div>
 
          <div className='w-full'>
             <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                  
                            <MdOutlineShoppingCart 
                                 className='text-xl' 
                              />
                              <span>Add to cart</span>
 
             </button>
          </div>
 
      </div>
     )
 }