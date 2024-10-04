import React,{useState,useEffect} from 'react'
import Layout from '../../layout'
import Order from './order'
import { Link, useLocation,useParams,useNavigate} from "react-router-dom";
import { accountTypeState } from '../recoil/state';
import { useRecoilValue ,useRecoilState} from 'recoil';
import { orderApi } from '../api/order';
import { ClipLoader } from 'react-spinners';
import { alertTypeState } from '../recoil/state';
import { analytics } from '../firebase';
import { logEvent } from "firebase/analytics";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function Checkout() {
      useEffect(() => {
       
            window.scrollTo(0, 0);
       
          
        }, []);
      const navigate=useNavigate()
       const [isLoading,setLoader]=useState(false)
       const currentUser=useRecoilValue(accountTypeState)
       const location =useLocation()
       const [delivery,setDelivery]=useState({dispatch:"FedEx Office",payment:"Payment with Stripe",city:"",state:'',address:'',postalCode:''})
       const [errorMsg, setErrorMsg] = useState(null)


       const products=location?.state?.products
       const total=location?.state?.total
      
       const [alert,setAlert]=useRecoilState(alertTypeState)

        const create=async()=>{
              setLoader(true)
              setErrorMsg(null)
             
              if (delivery?.city?.length < 3) {
                setErrorMsg(' City is required! ');
                setAlert({color:"danger",text:"City is required!"})
                setLoader(false)
              
                return;
              }
              if (delivery?.state?.length < 3) {
                setErrorMsg(' State is required! ');
                setAlert({color:"danger",text:"City is required!"})
                setLoader(false)
              
                return;
              }
              if (delivery?.address?.length < 3) {
                setErrorMsg(' City is required! ');
                setAlert({color:"danger",text:"City is required!"})
                setLoader(false)
              
                return;
              }

              if (delivery?.postalCode?.length < 3) {
                setErrorMsg(' Zip code is required! ');
                setAlert({color:"danger",text:"City is required!"})
                setLoader(false)
              
                return;
              }
              try{
                  const res=await orderApi.create(products,currentUser,delivery,total)
                  logEvent(analytics, 'begin_checkout',{items:products})
                  setLoader(false)
                  console.log(res,"ressss")
                  res&&  navigate("/orders");
               }catch(e){
                  console.log(e)
                  setLoader(false)
               }
        }
  return (
    <Layout>
             <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-xl font-semibold '>Checkout</h5>

                            </div>




                            <div className='flex w-full space-x-10 '>
                                   <div className='w-3/4'> 
                                       <Order 
                                         products={products}
                                         delivery={delivery}
                                         setDelivery={setDelivery}
                                       />

                                   </div>


                                     <div className='w-1/4'> 
                                          <div className='bg-white flex-col flex rounded-lg w-full space-y-5 px-3 shadow py-5'>
                                               <h5 className='text-lg font-semibold'>Total:</h5>
                                               <div className='flex flex-col space-y-1'>

                                                     <div className='flex items-center w-full justify-between'>
                                                           <h5 className='font-light text-slate-800 text-sm'>{products?.length} Items price</h5>
                                                           <h5 className='text-blue-600 text-sm'>${total}</h5>

                                                     </div>
                                                     <div className='flex items-center w-full justify-between'>
                                                           <h5 className='font-light text-slate-800 text-sm flex items-center space-x-0.5' >
                                                             <IoAlertCircleOutline
                                                               className='font-bold text-yellow-500 text-2xl'
                                                              /> 
                                                             <span className='text-xs font-semibold'>Delivery rate will be calculated on payment</span> 

                                                           </h5>
                                                           {/* <h5 className='text-blue-600 text-sm'>$130</h5> */}

                                                     </div>
                                                    

                                               </div>

                                               <div className='flex items-center w-full justify-between'>
                                                           <h5 className='  text-sm font-semibold'>Total price</h5>
                                                           <h5 className='text-blue-600 text-sm'>${parseInt(total)}</h5>

                                                 </div>
                                                  {isLoading?
                                                       <div className='w-full flex justify-center'>
                                                             <ClipLoader 
                                                                color='#C74A1F'
                                                                size={12}
                                                             />
                                                      </div>
                                                       :
                                                     <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}} onClick={create}>Confirm order</button>



                                                }
                                         
                                          </div>

                                     </div>

                            </div>
                        </div>






              </div>
        
    </Layout>

  )
}
