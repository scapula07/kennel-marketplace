import React,{useState,useEffect,useRef} from 'react'
import { useLocation,useNavigation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import Select from "react-select";
import { IoIosNotifications } from "react-icons/io";
import { FaHtml5 } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { BeatLoader } from 'react-spinners';
import { orderApi } from '../api/order';
import { Link } from 'react-router-dom';
import { messageApi } from '../api/message';
import { AiOutlineDownload } from "react-icons/ai";
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import {ClipLoader} from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox ,IoMdClose} from "react-icons/io";
import Modal from '../../components/modal';
import Shipment from './components/shipment';
import Cancel from './components/cancel';

export default function SellerOrder() {
     const navigate=useNavigate()
     const currentUser=useRecoilValue(accountTypeState)
    const [order,setOrder]=useState({images:[]})
    const [file,setFile]=useState({name:""})
    const [isLoading,setLoader]=useState(false)
    const [loading,setLoading]=useState(false)
    const [cancel,setCanceling]=useState(false)
    const hiddenFileInput = useRef()
    const location =useLocation()
    const [customer,setCustomer]=useState({})
    const [product,setProduct]=useState({images:[]})
    const [trigger,setTrigger]=useState(false)
    const [triggerCancel,setTriggeringCancel]=useState(false)
  
    const ordered=location?.state.order

      
    const handleClick = event => {
        hiddenFileInput.current.click()
       }
        const handleChange = async(e)=> {
        const dir = e.target.files[0]
    
        if (dir) {
          setFile(dir)
        }
       }
  

    
 
  
    useEffect(()=>{
      
        if(ordered?.id?.length != undefined){
          const unsub = onSnapshot(doc(db,"orders",ordered?.id), (doc) => {
            setOrder({...doc.data(),id:doc?.id})
           });
          }
         },[])


   

         const uploadContract=async()=>{
            setLoader(true)

              try{
                  const res=await orderApi.uploadContract(ordered,file,product,currentUser,customer)
                  setLoader(false)

              }catch(e){
                console.log(e)
                setLoader(false)
              }
         }
  
         const startMsg=async()=>{
            setLoading(true)
              try{
                const res=await messageApi.startConversation({id:customer?.id},currentUser)
                setLoading(false)
                res&&navigate("/messages")
              }catch(e){
                setLoading(false)
                console.log(e)
              }
          }


          const cancelOrder=async()=>{
            setCanceling(true)
             try{
                const res = await orderApi.cancelOrder(order,customer)
                
                
                setCanceling(false)

                setTriggeringCancel(false)
               }catch(e){
                console.log(e)
              
                setCanceling(false)
    
             }
          }
          // console.log(order,"oo")
  return (
    <>
  
    <div className='w-full'>
                <div className='flex flex-col space-y-3'>
                    <h5 className='text-white font-light text-sm'>Admin/Order</h5>
                    <h5 className='text-lg font-semibold text-white'></h5>

                </div>

                <div className='w-full rounded-lg py-6 px-4 flex justify-center'>
                       <div className='w-4/5 bg-white  rounded-xl px-6 py-8'>
                            <div className='flex flex-col border-b pb-4'>
                                    <h5 className='text-lg  text-slate-700'>Order Details</h5>
                                    <h5 className='text-sm font-light  text-slate-700'>Order ID:{order?.id}</h5>
                             </div>


                             <div className='flex w-full items-center justify-between py-6 border-b '>
                                     <Product 
                                       item={ordered?.products}
                                       product={product}
                                       setProduct={setProduct}
                                     />
                                         {loading?
                                           <ClipLoader 
                                              color="orange"

                                           />
                                           :
                                           <button className='py-2 px-6 bg-orange-500 rounded-lg text-white text-xs ' onClick={startMsg}>Message customer</button>

                                         }
                                          
                                     
                   
               
                             </div>

                             <div className='flex w-full justify-between py-4'>
                                   <div className='w-1/4'>
                                      <Tracker 
                                        order={order}
                                        customer={customer}
                                        product={product}
                                        setProduct={setProduct}
                                        currentUser={currentUser}
                                      />
                                   </div>

                                    <div className='w-2/4 flex flex-col px-4 space-y-8'>                         
                                          <div className='flex flex-col space-y-4'>
                                               <h5 className='text-slate-500 font-semibold'>Customer & Delivery details</h5>
                                               <div className='bg-slate-100 py-8 px-4'         style={{background: "#F3F3F3"}}>
                                                  <Customer 
                                                      order={ordered}
                                                      customer={customer}
                                                      setCustomer={setCustomer}
                                                  />
                                                  <div className='flex flex-col'>
                                                      <h5 className='font-light text-slate-500 text-xs'>City :{ordered?.delivery?.city}</h5>
                                                      <h5 className='font-light text-slate-500 text-xs'>Delivery service :{ordered?.delivery?.dispatch}</h5>
                                                      <h5 className='font-light text-slate-500 text-xs'>Payment method :{ordered?.delivery?.payment}</h5>
                                                      

                                                  </div>

                                              </div>
                                            
                                          </div>

                                          <div className=''>
                                              <h5 className='text-slate-500 font-semibold text-sm'>Payment status:{ordered?.paid?
                                              <span className='text-green-500 text-xs'> Paid</span>
                                              :
                                              <span className='text-yellow-500 text-xs'>Pending</span>
                                              
                                            }</h5>
                                            
                                          </div>

                                          <div className='flex flex-col w-full space-y-2'>
                                              <h5 className='text-slate-500 font-semibold'>Contract(
                                                <Link to="https://firebasestorage.googleapis.com/v0/b/reach-nft-auction.appspot.com/o/order%2Fkb%20contract%20template.pdf?alt=media&token=912fe008-c696-4816-9a3c-a75495435612">
                                                <span className='text-sm font-light text-orange-500 hover:underline ' >Example contract</span>
                                                </Link>
                                                
                                              )</h5>
                                              {ordered?.contract==="waiting"?
                                                   <>
                                                   {file?.name?.length==0?


                                               
                                                    <div className='flex bg-slate-100 w-3/4 items-center py-2 px-5 rounded-sm space-x-4'
                                                      style={{background: "#F3F3F3"}}
                                                      onClick={handleClick}
                                                    >
                                                         <MdOutlineFileUpload 
                                                           className='text-xl font-light'
                                                         />
                                                         <h5 className='text-slate-500 font-light text-sm'>Upload contract</h5>

                                                         <input
                                                            type="file"
                                                            className='hidden'
                                                            ref={hiddenFileInput}
                                                            onChange={handleChange}
                                                            />

                                                          
                                                    </div>
                                                    :
                                                    <div className='flex space-x-4 items-center'>
                                                            <div className='flex bg-slate-100 w-3/4 items-center py-2 px-5 rounded-sm space-x-4'
                                                                    style={{background: "#F3F3F3"}}
                                                                    onClick={handleClick}
                                                                >
                                                                
                                                                    <h5 className='text-slate-500 font-light text-sm'>{file?.name}</h5>

                                                                    <input
                                                                        type="file"
                                                                        className='hidden'
                                                                        ref={hiddenFileInput}
                                                                        onChange={handleChange}
                                                                        />

                                                                        
                                                                </div>
                                                                {isLoading?

                                                                    <BeatLoader 
                                                                      size={"8"}
                                                                    />
                                                                      :

                                                                    <h5 className='text-sm font-semibold text-orange-500' onClick={uploadContract}>Upload
                                                                    </h5>

                                                                }
                                                          

                                                    </div>
                                       

                                                   }
                                                    </>
                                                    :
                                                    <>
                                                    {ordered?.contract==="sent"?
                                                         <div className='flex bg-slate-100 w-3/5 items-center py-2 px-5 rounded-sm space-x-4'
                                                               style={{background: "#F3F3F3"}}
                                                           
                                                             >
                                                              
                                                                  <h5 className='text-slate-500 font-light text-sm'>Contract sent</h5>
                                                                  
                                                                  <AiOutlineDownload className='text-xl'
                                                                  />
         
                                                                  <input
                                                                     type="file"
                                                                     className='hidden'
                                                                     ref={hiddenFileInput}
                                                                     onChange={handleChange}
                                                                     />


         
                                                                   
                                                             </div>
                                                          :
                                                   <div className='flex bg-slate-100 w-3/5 items-center py-2 px-5 rounded-sm space-x-4'
                                                          style={{background: "#F3F3F3"}}
                                                      
                                                        >
                                                         
                                                             <h5 className='text-slate-500 font-light text-sm'>Contract signed</h5>
                                                             
                                                             <AiOutlineDownload className='text-xl'
                                                             />
    
                                                            
    
                                                              
                                                        </div>

                                                    }
                                                    </>

                                              }
                                            
                                          </div>
                                    </div>

                                      <div className='w-1/4 flex flex-col space-y-2'>
                                            <h5 className='text-slate-500 font-semibold'>Order summary</h5>
                                            <div className='flex flex-col py-6'>
                                                 <h5 className='text-slate-500 font-light'>Product Price:        ${order?.total}</h5>

                                            </div>

                                            <button className='text-orange-400 border border-orange-400 py-2 px-6 rounded-sm text-sm' onClick={()=>setTriggeringCancel(true)}>
                                           
                                                 Cancel order
                                            
                                            </button>
                                            {order?.shipmentId?.length ==0?
                                               <button className='bg-orange-400 border border-orange-400 py-2 px-6 rounded-sm text-sm ' onClick={()=>setTrigger(true)}>
                                        
                                               Prepare Shipment
                                               </button>
                                                   :
                                               <button className='bg-orange-400 border border-orange-400 py-2 px-6 rounded-sm text-sm ' onClick={()=>setTrigger(true)}>
                                        
                                                Update Shipment
                                               </button>
                                              
                                              

                                               }
                                           
                                      

                                            
                                             
                                            
                                    
                                    </div>

                             </div>
                        

                       </div>
                       

                </div>


    </div>
    <Modal trigger={trigger}  cname="w-3/5  flex justify-center   px-8 rounded-lg py-7 overflow-y-scroll">
            <div className='bg-white w-4/5  rounded-lg px-4 py-4'>
                    <div className='w-full justify-end flex '>
                           
                                <IoMdClose
                                      className='text-2xl font-light'
                                      onClick={()=>setTrigger(false)}
                               />
                     </div>
                     <Shipment 
                       order={order}
                       customer={customer}
                       currentUser={currentUser}
                       setTrigger={setTrigger}
                     />
            </div>

      </Modal>
      <Modal trigger={triggerCancel}  cname="w-1/2 py-2   px-8 rounded-lg ">
              <div className='bg-white w-full  rounded-lg px-4 py-4 space-y-4'>
                      <div className='w-full justify-end flex '>
                            
                                  <IoMdClose
                                        className='text-2xl font-light'
                                        onClick={()=>setTriggeringCancel(false)}
                                />

                      
                            
                      </div>

                  <div>
                      <Cancel 
                        product={product}
                        cancelOrder={cancelOrder}
                        cancel={cancel}
                      />



                  </div>

              </div>


      </Modal>

    </>
  )
}




const Product=({item,product,setProduct})=>{
      //  const [product,setProduct]=useState({images:[]})
       console.log(item,"iii")
       useEffect(()=>{
      
        if(item[0]?.id?.length != undefined){
          const unsub = onSnapshot(doc(db,"products",item[0]?.id), (doc) => {
            console.log(doc.data(),"daa")
        
            setProduct({...doc.data(),id:doc?.id})
           });
          }
         },[])

         console.log(product,"prod")
           
      return(
        <div className='flex space-x-4'>
             <img 
               src={product?.images[0]}
               className="h-36"
             />
             <div className='flex flex-col'>
                  <h5 className='font-semibold text-slate-600 text-lg'>{product?.name}</h5>
                  <h5 className='font-light'>{product?.description?.slice(0,150)}...</h5>

             </div>

        </div>
      )
}





const Tracker=({order,customer,currentUser,product})=>{
      const [inProgess,setProgressing]=useState(false)
      const [inDelivered,setDelivery]=useState(false)
     const deliverySent=async()=>{
            setProgressing(true)
         try{
           const res=orderApi.sentPackage(order,customer,currentUser,product)
           setProgressing(false)
         }catch(e){
          console.log(e)
          setProgressing(false)
         }
     }

    const deliveryReceived=async()=>{
          setDelivery(true)
      try{
        const res=orderApi.deliveredPackage(order)
        setDelivery(false)
      }catch(e){
        console.log(e)
        setDelivery(false)
      }
    }
     return(
        <div className='w-full flex flex-col py-'>
            <h5 className='text-slate-500 font-semibold'>Update Tracking</h5>
                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                                <IoIosNotifications
                                   className='text-2xl text-green-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order received</h5>
                                   {/* <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5> */}

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>

                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                              <IoDocumentTextSharp 
                                className={`${order?.contract =='sent' || order?.contract =='signed' ? 'text-2xl text-green-600':'text-2xl text-slate-600'}`}
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Contract sent</h5>
                                   {/* <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5> */}

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>


                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                             <IoDocumentTextSharp 
                                 className={`${order?.contract =='signed' ? 'text-2xl text-green-600':'text-2xl text-slate-600'}`}
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Contract signed</h5>
                                   {/* <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5> */}

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>



                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                           {order?.deliveryStatus ==="pending"?
                             <>
                             {inProgess?
                                <BeatLoader size={6} color="orange"/>
                                      :
                             
                                  <MdOutlineCheckBoxOutlineBlank 
                                     onClick={deliverySent}
                                     className='text-green-400 text-xl'
                                     />
                                  }
                             </>
                           
                              :
                              <IoMdCheckbox 
                                 className='text-green-400 text-3xl'
                              />
                             

                           }
                          
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order transmited to courier</h5>
                                   {/* <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5> */}

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>

                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                        {order?.deliveryStatus=="delivered"?
                          
                           
                              
                           <IoMdCheckmark
                              className='text-2xl text-green-600'
                             />
                                :
                             <>
                             {inDelivered?
                                <BeatLoader size={6} color="orange"/>
                                      :
                             
                                  <MdOutlineCheckBoxOutlineBlank 
                                     onClick={deliveryReceived}
                                     className='text-green-400 text-xl'
                                     />
                                  }
                             </>
                             

                           }
                           
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order delivered</h5>
                                   {/* <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5> */}

                              </div>
                        </div>

                        <h5 className='h-3 w-0.5 border'></h5>

                </div>
        </div>
        
     )
}






const Customer=({order,customer,setCustomer})=>{
    // const [customer,setCustomer]=useState({})
 
   
      useEffect(()=>{
      
        if(order?.creator?.length != undefined){
          const unsub = onSnapshot(doc(db,"users",order?.creator), (doc) => {
            console.log(doc.data(),"daa")
        
            setCustomer({...doc.data(),id:doc?.id})
           });
          }
         },[])
  
      return(
        <div className='flex flex-col'>
             <h5 className='text-lg font-semibold'>{customer?.name}</h5>
             <div className='flex flex-col py-4 '>
                 <h5 className='font-light text-slate-500 text-xs'>Email address:{customer?.email}</h5>
                 <h5 className='font-light text-slate-500 text-xs'>Phone number:{customer?.phone}</h5>

             </div>

        </div>
      )
}