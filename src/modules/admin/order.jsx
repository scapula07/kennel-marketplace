import React,{useState,useEffect,useRef} from 'react'
import { useLocation,useParams} from "react-router-dom";
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
export default function Order() {
    const [order,setOrder]=useState({images:[]})
    const [file,setFile]=useState({name:""})
    const [isLoading,setLoader]=useState(false)
    const hiddenFileInput = useRef()
    const location =useLocation()
  
    const ordered=location?.state.order

      
    const handleClick = event => {
        hiddenFileInput.current.click()
    }


        const handleChange = async(e)=> {
        const dir = e.target.files[0]
        console.log(dir,"dir")
        if (dir) {
      
            setFile(dir)

        }



        }
  

    
 
  
    useEffect(()=>{
      
        if(ordered?.id?.length != undefined){
          const unsub = onSnapshot(doc(db,"orders",ordered?.id), (doc) => {
            console.log(doc.data(),"daa")
        
            setOrder({...doc.data(),id:doc?.id})
           });
          }
         },[])


         console.log(ordered,"ooo")

         const uploadContract=async()=>{
            setLoader(true)

              try{
                  const res=await orderApi.uploadContract(ordered,file)
                  setLoader(false)

              }catch(e){
                console.log(e)
                setLoader(false)
              }
         }
  
       
  return (
    <div className='w-full'>
                <div className='flex flex-col space-y-3'>
                    <h5 className='text-white font-light text-sm'>Admin/Order</h5>
                    <h5 className='text-lg font-semibold text-white'></h5>

                </div>

                <div className='w-full rounded-lg py-6 px-4 flex justify-center'>
                       <div className='w-4/5 bg-white  rounded-xl px-6 py-8'>
                            <div className='flex flex-col border-b pb-4'>
                                    <h5 className='text-lg  text-slate-700'>Order Details</h5>
                                    <h5 className='text-sm font-light  text-slate-700'>Order no:</h5>
                             </div>


                             <div className='flex w-full items-center justify-between py-6 border-b '>
                                     <Product 
                                       item={ordered?.products}
                                     />
                                    
                                          <button className='py-2 px-6 bg-orange-500 rounded-lg text-white text-xs '>Message customer</button>
                                     
                   
               
                             </div>

                             <div className='flex w-full justify-between py-4'>
                                   <div className='w-1/4'>
                                      <Tracker />
                                   </div>

                                    <div className='w-2/4 flex flex-col px-4 space-y-8'>                         
                                          <div className='flex flex-col space-y-4'>
                                               <h5 className='text-slate-500 font-semibold'>Customer & Delivery details</h5>
                                               <div className='bg-slate-100 py-8 px-4'         style={{background: "#F3F3F3"}}>
                                                  <Customer 
                                                      order={ordered}
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
                                              <h5 className='text-slate-500 font-semibold'>Contract</h5>
                                              {ordered?.contract==="waiting"?
                                                   <>
                                                   {file?.name?.length==0?


                                               
                                                    <div className='flex bg-slate-100 w-3/4 items-center py-2 px-5 rounded-lg space-x-4'
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
                                                            <div className='flex bg-slate-100 w-3/4 items-center py-2 px-5 rounded-lg space-x-4'
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
                                                         <div className='flex bg-slate-100 w-3/5 items-center py-2 px-5 rounded-lg space-x-4'
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
                                                       <div>

                                                       </div>

                                                    }
                                                    </>

                                              }
                                            
                                          </div>
                                    </div>

                                      <div className='w-1/4'>
                                            <h5 className='text-slate-500 font-semibold'>Order summary</h5>
                                            <div className='flex flex-col py-6'>
                                                 <h5 className='text-slate-500 font-light'>Product Price:        ${order?.total}</h5>

                                            </div>
                                    
                                    </div>

                             </div>
                        

                       </div>
                       

                </div>


    </div>
  )
}




const Product=({item})=>{
       const [product,setProduct]=useState({images:[]})
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
                  <h5 className='font-light'>{product?.description}</h5>

             </div>

        </div>
      )
}





const Tracker=()=>{
     return(
        <div className='w-full flex flex-col py-'>
            <h5 className='text-slate-500 font-semibold'>Update Tracking</h5>
                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                              <IoIosNotifications
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order received</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>

                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                              <IoDocumentTextSharp 
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Contract sent</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>


                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                             <IoDocumentTextSharp 
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Contract signed</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>



                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                             <input
                               type={"checkbox"}
                              />
                             {/* <FaCartShopping
                                className='text-2xl text-slate-600'
                               /> */}
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order transmited to courier</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-8 w-0.5 border'></h5>

                </div>

                <div className='flex flex-col py-4'>
                        <div className='flex items-center space-x-4'>
                          
                             <IoMdCheckmark
                                className='text-2xl text-slate-600'
                               />
                              <div className='flex flex-col'>
                                   <h5 className=' font-semibold text-slate-600'>Order delivered</h5>
                                   <h5 className='text-xs font-light text-slate-500'>22 DEC 7:20 AM</h5>

                              </div>
                        </div>

                        <h5 className='h-3 w-0.5 border'></h5>

                </div>
        </div>
        
     )
}






const Customer=({order})=>{
    const [customer,setCustomer]=useState({})
 
   
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