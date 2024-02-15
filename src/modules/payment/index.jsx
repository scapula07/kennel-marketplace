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

export default function Payment() {
       const [trigger,setTrigger]=useState(false)
  return (
    <Layout>
                
             <div className='w-full h-full flex justify-center py-10'>
                   <div className='flex flex-col w-3/4 space-y-10'> 
                            <div className='flex w-full justify-between '>
                                <h5 className='text-4xl font-semibold '>Payment methods</h5>

                            
                                <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Save changes</button>

                            </div>


                            <div className='flex flex-col space-y-4 w-full'>
                                 <div className='py-4 '>
                                    <h5 className='text-xl fonnt-semibold text-slate-600'>Credit cards</h5>

                                 </div>
                          {[
                            {
                                img:pay1,
                                text:"Visa ending in 2533"

                            },
                            {
                                img:pay2,
                                text:"Mastercard ending in 2533"

                            },


                           ].map((item)=>{
                              return(
                                  <div className='flex w-3/5 bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
                                      <img 
                                        src={item?.img}
                                        className="w-10 h-10"
                                      />

                                      <div className='flex w-full justify-between'>
                                          <div className='flex flex-col'>
                                                <div className='flex flex-col'>
                                                     <h5 className='text-lg text-slate-700 font-light'>{item?.text}</h5>
                                                     <h5 className='text-sm text-slate-500 '>Expiry 06/2024</h5>
                                                </div>

                                                <div className='flex items-center'>
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
                

                      <div className='flex flex-col bg-white w-full h-full space-y-6'>


                      {[
                            {
                                img:pay4,
                                text:"Kernel wallet"

                            },
                            {
                                img:pay5,
                                text:"Pay/receive cash"

                            },
                            {
                                img:pay3,
                                text:"Visa ending in 2533"

                            }
                       


                           ].map((item)=>{
                              return(
                                  <div className='flex w-full justify-between bg-white rounded-lg px-4 space-x-6  py-2'>
                                      <img 
                                        src={item?.img}
                                        className="w-20 h-8"
                                      />

                                      <div className='flex w-4/5'>
                                          <div className='flex flex-col'>
                                                <div className='flex flex-col'>
                                                     <h5 className='text-lg text-slate-700 font-light'>{item?.text}</h5>
                                                     <h5 className='text-sm text-slate-500 '>Expiry 06/2024</h5>
                                                </div>

                                                <div className='flex items-center'>
                                                </div>
                                          </div>

                                         

                                      </div>
                                     
                                   
                                  </div>
                              )
                           })

                          }


                              {[

                              {
                                  icon:<BiTransfer />,
                                  text:"Cashless Transfer"

                              },


                              ].map((item)=>{
                                return(
                                    <div className='flex w-full justify-between bg-white rounded-lg px-4 space-x-6 h-28 py-4'>
                                        <h5 className='text-xl border px-6 py-2 rounded-lg text-center '>{item?.icon}</h5>

                                        <div className='flex w-4/5 justify-between'>
                                            <div className='flex flex-col'>
                                                  <div className='flex flex-col'>
                                                      <h5 className='text-lg text-slate-700 font-light'>{item?.text}</h5>
                                                    
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
