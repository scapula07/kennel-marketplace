import React ,{useState,useEffect} from 'react'
import Layout from '../../layout'
import { BiLogoVisa } from "react-icons/bi";
import pay1 from "../../assets/pay1.png"
import pay2 from "../../assets/pay2.png"
import pay3 from "../../assets/pay3.png"
import pay4 from "../../assets/k-wallet.png"
import pay5 from "../../assets/cash.png"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Modal from '../../components/modal';
import { IoMdClose } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { useRecoilValue ,useRecoilState} from 'recoil';
import { accountTypeState } from '../recoil/state';
import { IoWalletOutline } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { BsCash } from "react-icons/bs";
import { BiSolidCreditCard } from "react-icons/bi";
import { paymentApi } from '../api/payment';
import { BeatLoader ,ClipLoader} from 'react-spinners';
import { stripeApi } from '../api/stripe';
import { BsStripe } from "react-icons/bs";
import { alertTypeState } from '../recoil/state';

export default function Payment() {
      const [alert,setAlert]=useRecoilState(alertTypeState)
      const [trigger,setTrigger]=useState(false)
       const currentUser=useRecoilValue(accountTypeState)
       const [enabled,setEnable]=useState(false)
         useEffect(() => {
       
              window.scrollTo(0, 0);


              if(currentUser?.payments?.length >0){
                     getAccount()
                }

  
            }, [currentUser]);
       
       const [payments,setPayment]=useState([])
       const [isLoading,setLoader]=useState(false)
       const [loading,setLoading]=useState(false)
    

       const addCard=async()=>{
        setLoader(true)
          try{
            const res=await paymentApi.addPayment(currentUser,payments)

            setLoader(false)
          }catch(e){
            console.log(e)
            setLoader(false)
            setAlert({color:"danger",text:"Something went wrong!"})
          }
       }

       const createStripe=async(text)=>{
             setLoading(true)
             try{
               const res=await stripeApi.createAccount()
               const res1=await paymentApi.addPayment(currentUser,[{text:"Stripe",accountId:res?.data?.data?.account_id,verification:false}])
               console.log(res?.data?.data,"res")
               window.location.href =res?.data?.data?.link;
               console.log(res?.data?.data?.account_id," account id")
               setLoader(false)
               setPayment((prev)=>[...prev,text]) 
            
             }catch(e){
              console.log(e)
              setLoader(false)
              setAlert({color:"danger",text:"Something went wrong!"})
             }
          
       }


       const getAccount=async()=>{
              try{
                     const res=await stripeApi.retrieveAccount(currentUser)
                     console.log(res?.data?.data?.charges_enabled)
                    setEnable(res?.data?.data?.charges_enabled)
                    res?.data?.data?.charges_enabled==false&& setAlert({color:"danger",text:"Stripe charges is not enable,please complete onboarding"})

               }catch(e){
                console.log(e)
                setAlert({color:"danger",text:"Something went wrong!"})
               }
       }



       const completeOnboarding=async()=>{
               setLoading(true)
        try{ 
               const res=await stripeApi.completeOnboarding(currentUser)
               window.location.href =res?.data?.data?.link;
               setLoader(false)
         }catch(e){
          console.log(e)
              setLoader(false)
              setAlert({color:"danger",text:"Something went wrong!"})
         }
 }


       console.log(payments,"ppp")
  return (
    <Layout>
                
             <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-4xl font-semibold '>Payment methods</h5>

                               {isLoading?
                                <BeatLoader
                                  size={"8"}
                                   />
                                :

                                 <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600' onClick={addCard}>Save changes</button>

                               }
                             

                            </div>


                            <div className='flex flex-col space-y-4 w-full'>
                                 <div className='py-4 '>
                                    {/* <h5 className='text-xl fonnt-semibold text-slate-600'>Credit cards</h5> */}

                                 </div>
                          {currentUser?.payments?.length !=undefined&&[...payments,...currentUser?.payments]?.map((item)=>{
                              return(
                                  <div className='flex w-3/5 bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
                                    {item?.text==="Kennel wallet"&&<IoWalletOutline 
                                         className='text-3xl  rounded-lg text-center '
                                    />}
                                    {item?.text==="Cash"&&<BsCash 
                                       className='text-3xl  rounded-lg text-center '
                                    />}
                                    {item?.text==="Cashless Transfer"&&<BiTransfer 
                                       className='text-3xl  rounded-lg text-center '
                                    />}
                                    {item?.text==="Stripe"&&<BsStripe 
                                       className='text-3xl  rounded-lg text-center '
                                     />}

                                      <div className='flex w-full justify-between'>
                                          <div className='flex flex-col space-y-3'>
                                                <div className='flex flex-col'>
                                                     <h5 className='text-lg text-slate-700 font-light'>{item?.text}</h5>
                                                     {/* <h5 className='text-sm text-slate-500 '>Expiry 06/2024</h5> */}
                                                </div>

                                                <div className='flex items-center'>
                                                    {enabled==false&&
                                                       <button className='bg-orange-600 text-xs text-white rounded-sm px-2 py-1.5' onClick={()=>!loading&&completeOnboarding()}>
                                                        {!loading?
                                                           "Complete onboarding"
                                                           :
                                                           <ClipLoader size={"12"} color="white"/>

                                                        }

                                                        </button>
                                                    }
                                                </div>
                                          </div>

                                          <MdOutlineDeleteOutline 
                                              className='text-slate-500 text-2xl'
                                          />

                                      </div>
                                     
                                   
                                  </div>
                              )
                           })

                          }

                     
 
                     </div>

                     <div className='flex flex-col space-y-4 w-full'>
                                 <div className='py-4 flex items-center space-x-4'>
                                    <IoMdAdd 
                                      className='text-3xl text-slate-500'
                                      onClick={()=>setTrigger(true)}
                                    />
                                    <h5 className='text-lg font-light text-slate-600'>Add new payment method</h5>

                                 </div>
                    </div>

  

                </div>

              
        </div>


        <Modal trigger={trigger}  cname="w-1/3 py-2 h-96  px-4 rounded-lg  ">
                   <div className='w-full justify-end flex '>
                     <h5 className='bg-white rounded-full p-1'>
                        <IoMdClose
                              className='text-2xl font-light'
                              onClick={()=>setTrigger(false)}
                          />

                     </h5>
                   
                     </div>
               <div className='flex flex-col w-11/12 rounded-lg py-4 px-4 bg-white h-full overflow-y-scroll space-y-4'>
                    <h5 className='text-lg text-slate-600 font-semibold'>Select:</h5>
                    <div className='flex justify-center w-full'>
                        {loading&&
                          <ClipLoader color='grey' size={14}/>

                        }

                      </div>
                

                      <div className='flex flex-col bg-white w-full h-full space-y-2'>

                              {[
                                 {
                                  icon:<BsStripe />,
                                  text:"Stripe",
                                  call:(text)=>createStripe(text)
  
                              },
                              ].map((item)=>{
                                return(
                                    <div className='flex w-full justify-between bg-white rounded-lg px-4 space-x-6 hover:bg-slate-100 py-4'
                                      onClick={()=>item?.call(item?.text)}
                                    >
                                        <h5 className='text-3xl  rounded-lg text-center '>{item?.icon}</h5>

                                        <div className='flex w-4/5 justify-between'>
                                            <div className='flex flex-col'>
                                                  <div className='flex flex-col'>
                                                      <h5 className='text- text-slate-700 font-light'>{item?.text}</h5>
                                                    
                                                  </div>

                                                  <div className='flex items-center'>
                                                  </div>
                                            </div>

                                      

                                        </div>
                                      
                                    
                                    </div>
                                )
                              })

                              }
                        
                      </div>


                

                     
               </div>

        </Modal>


    </Layout>

  )
}
