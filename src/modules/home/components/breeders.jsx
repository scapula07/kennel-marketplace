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
    <div className='md:w-4/6 w-full px-4 md:px-0 md:py-20 py-5 flex flex-col '>    
           <div className='flex md:flex-row flex-col w-full items-center md:justify-between space-y-6 md:space-y-0' >


                  <div className='flex flex-col space-y-2'>
                      <h5 className='text-4xl font-semibold'>Top breeders</h5>
                      <h5 className='text-slate-500  '>Check out the best breeders who work on Kennel Breeders</h5>

                  </div>
                  <Link to="/sellers" className='w-full md:w-28 px-4 md:px-0'>
                  <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600 w-full'>{"View all ->"}</button>
                 </Link>
             </div>


               <div  className='grid grid-flow-row md:grid-cols-3 grid-cols-2  gap-4 gap-y-8 h-full w-full py-6'>
                      {sellers?.length >0&&sellers?.map((seller)=>{
                          return(
                            <Card 
                              seller={seller}
                            />
                          )
                       })}



                </div>

                <div className='bg-white rounded-lg flex md:flex-row flex-col w-full px-8 py-4 shadow justify-between'>
                      <div className='flex flex-col space-y-4 md:w-1/3 w-full'>
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


                      <div className='md:w-1/2'>
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
    <div className='flex flex-col w-full space-y-2'>
        <div className=' w-full flex flex-col items-center space-y-3'>
           <Link to="/seller" state={{seller:seller}} >
           
              <img 
                src={seller?.img}
                className="rounded-full w-44 h-44"

              />
          </Link>

        <div className='flex flex-col space-y-1 items-center'>
           <h5 className='text-slate-800 text-lg  font-semibold'>{seller?.name}</h5>
         
              <h5 className=' text-sm text-slate-900 '>{seller?.animal?.value} Breeder</h5>
         
          

         </div>

            



        </div>

        
        <div className='w-full flex justify-center py-2'>
        <Link to="/seller" state={{seller:seller}} >
            <button className='text-white py-2.5 space-x-4 px-4 rounded-lg flex justify-center items-center w-full text-sm' style={{background:"#C74A1F"}}>
                      
                      <MdOutlineShoppingCart 
                          className='text-xl' 
                        />
                        <span className='text-xs'>View profile</span>

           </button>
        </Link>
        </div>

    </div>
   )
}
