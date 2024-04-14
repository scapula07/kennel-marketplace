import React ,{useState,useEffect} from 'react'
import { MdOutlineStar } from "react-icons/md";
import { FiArrowRight } from 'react-icons/fi';
import breeder from "../../../assets/breeder.png"
import card from "../../../assets/card.png"
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../../recoil/state';
import { Link } from 'react-router-dom';
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc,where } from 'firebase/firestore'
 import { productApi } from '../../api/product';
import { ClipLoader } from 'react-spinners';
import { db } from '../../firebase';
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Breeders() {
      const currentUser=useRecoilValue(accountTypeState)
      const [sellers,setSeller]=useState([])
      useEffect(()=>{
        const q = query(collection(db, "users"),where('role','==','breeder'),limit(3));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const products = []
            querySnapshot.forEach((doc) => {
              products.push({ ...doc.data(), id: doc.id })
    
            });
    
    
            setSeller(products)
    
    
       
          });
       },[])
  return (
    <div className='w-4/6  py-20 flex flex-col '>


           <div className='flex w-full items-center justify-between' >

                  <div className='flex flex-col space-y-2'>
                      <h5 className='text-6xl font-semibold'>Top breeders</h5>
                      <h5 className='text-slate-500  '>Check out the best breeders who work on Kennel Breeders</h5>

                  </div>
                  <Link to="/sellers">
                  <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>{"View all ->"}</button>
                 </Link>
             </div>


               <div  className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full py-6'>
               {sellers?.length >0&&sellers?.map((seller)=>{
                          return(
                            <Card 
                              seller={seller}
                            />
                          )
                      })}



                </div>

                <div className='bg-white rounded-lg flex w-full px-8 py-4 shadow justify-between'>
                      <div className='flex flex-col space-y-4 w-1/3'>
                           <h5 className='text-2xl font-semibold'>Want to become a breeder?</h5>
                           <h5 className='text-xs font-light '>Join Kennel Breeders and grow your breeding business with us. Sell products and services along with animal breeding activity</h5>
                        <Link to={`${currentUser?.id?.length ==undefined? "/login":"/breeder" }`}>
                             
                           <button className='text-blue-600 py-3 text-sm space-x-4 px-4 rounded-lg flex justify-center space-x-4 items-center  border border-blue-600 ' >
                                <span>Become a breeder</span>
                                  <FiArrowRight
                                      className='text-xl' 
                                  />
                                                

                            </button>
                        
                        
                        
                        </Link>
                    


                             </div>


                      <div className='w-1/2'>
                           <img 
                              src={card}
                           />

                      </div>

                </div>


    </div>
  )
}


const Card=({seller})=>{
  return(
    <div className='flex flex-col w-full space-y-4'>
        <div className=' w-full flex flex-col items-center space-y-3'>
           <Link to="/seller" state={{seller:seller}} >
           
              <img 
                src={seller?.img}
                className="rounded-full w-56 h-56"

              />
          </Link>

        <div className='flex flex-col space-y-2 items-center'>
           <h5 className='text-slate-500 text-xl font-semibold'>{seller?.name}</h5>
         
              <h5 className=' text-lg text-slate-500 '>{seller?.animal?.value} Breeder</h5>
         
          

         </div>

            



        </div>

        
        <div className='w-full flex justify-center py-6'>
        <Link to="/seller" state={{seller:seller}} >
            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                      
                      <MdOutlineShoppingCart 
                          className='text-xl' 
                        />
                        <span>View profile</span>

           </button>
    </Link>
        </div>

    </div>
   )
}
