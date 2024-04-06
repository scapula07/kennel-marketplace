import React ,{useEffect,useState} from 'react'
import prod from "../../assets/prod.png"
import Delivery from './delivery'
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import { accountTypeState } from '../recoil/state';
import { useRecoilValue } from 'recoil';
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoMdRadioButtonOn } from "react-icons/io";


export default function Order({products,delivery,setDelivery}) {
      const currentUser=useRecoilValue(accountTypeState)
      const [payment,setPayment]=useState("Payment with Stripe")
  return (
    <div className='w-full flex flex-col rounded-lg py-6 px-6 space-y-3'
        style={{background: "#F3F3F3"}}
        >
            <div>
                <h5 className='text-2xl font-semibold'>Orders</h5>
            </div>
            <div className='flex flex-col space-y-4'>
                   <h5 className='text-lg font-semibold'>1. Contact information</h5>
                   <div className='flex flex-col'>
                       <h5 className='text-sm font-light'>{currentUser?.name}</h5>
                       <h5 className='text-sm font-light'>{currentUser?.phone}</h5>
                       <h5 className='text-sm font-light'>{currentUser?.email}</h5>

                   </div>

              </div>



              <div className='flex flex-col space-y-4'>
                   <h5 className='text-lg font-semibold'>2. Order information</h5>
                   {products?.map((item)=>{
                      return(
                        <Product
                           item={item}
                          
                         />
                      )
                   })

                   }
                
                 

              </div>


              <div className='flex flex-col space-y-4 w-full'>
                   <h5 className='text-lg font-semibold'>3. Delivery</h5>
                   <Delivery 
                          delivery={delivery}
                          setDelivery={setDelivery}
                   />
                 

              </div>

              <div className='flex flex-col space-y-4 w-full'>
                   <h5 className='text-lg font-semibold'>4. Payment</h5>
                   <div className='flex flex-col space-y-2.5 py-5 bg-white rounded-lg px-4'>
                   <h5 className='text-slate-600'>Choose option</h5>
                     {["Payment with Stripe"].map((text)=>{
                          return(
                            <div className='rounded-full border w-1/2 px-4 py-1 flex items-center space-x-3'> 
                          {payment===text?
                              <IoMdRadioButtonOn 
                                className='text-blue-400'
                                
                              />
                              :
                              <IoMdRadioButtonOff 
                                 className='text-blue-400'
                                  onClick={()=>setPayment(text) ||setDelivery({...delivery,payment:text})}
                              />
                           }

                            <h5 className='font-light text-slate-700 '>{text}</h5>
                         </div>
                          )
                     })

                     }
                
                </div>

                <div className='flex flex-col space-y-4 w-full'>
                   {/* <h5 className='text-lg font-semibold'>5. Order recipient contact information </h5>
                   */}
                 

              </div>
                 

              </div>



    </div>
  )
}




const Product=({item})=>{
  const [product,setProduct]=useState({images:[]})
  useEffect(()=>{
   
   if(item?.id?.length != undefined){
     const unsub = onSnapshot(doc(db,"products",item?.id), (doc) => {
       console.log(doc.data(),"daa")
   
       setProduct({...doc.data(),id:doc?.id})
      });
     }
    },[])

    console.log(product,"prod")
      return(
    <div className='flex w-full bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
        <img 
          src={product?.images[0]}
          className="w-20 h-20"
        />

        <div className='flex w-full justify-between'>
            <div className='flex flex-col'>
                  <div className='flex flex-col space-y-3'>
                       <h5 className='text-lg text-slate-700 font-light'>{product?.name}</h5>
                       <h5 className='text-sm text-slate-500 '>{product?.description?.slice(0,50)}</h5>
                  </div>

                  <div className='flex items-center'>
                  </div>
            </div>
          

          <div>
          </div>


        </div>
        </div>
      )
}