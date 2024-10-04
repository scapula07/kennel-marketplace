import React,{useState,useEffect} from 'react'
import cover from "../../../assets/cover.png"
import cat from "../../../assets/catbackground.png"
import horse from "../../../assets/horsebackground.png"
import salamander from "../../../assets/salamanderbackground.png"
import breeder from "../../../assets/breeder.png"
import { MdOutlineStar,MdOutlineShoppingCart  } from "react-icons/md";
import {FiArrowRight} from "react-icons/fi"

import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where,orderBy}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { messageApi } from '../../api/message';

import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../../recoil/state';
import Modal from '../../../components/modal'
import Qrcode from './qrcode'



export default function Cover({seller}) {

      const currentUser=useRecoilValue(accountTypeState)
      const [isLoading,setLoader]=useState(false)
      const [bg,setBg]=useState(cover)
      const [trigger,setTrigger]=useState(false)
      const navigate=useNavigate()
       


      const startMsg=async()=>{
        setLoader(true)
          try{
            const res=await messageApi.startConversation(seller,currentUser)
            setLoader(false)
            res&&navigate("/messages")
          }catch(e){
            console.log(e)
            setLoader(false)
          }
      }

      useEffect(()=>{
        switch (seller?.animal?.value) {
        
          case 'Calf':
            setBg(cat)
          break;
          case 'Puppy':
            setBg(cover)
          break;
          case 'Kitten':
            setBg(cat)
          break;
          default:
           setBg(cover)
           
          
        }

       },[seller])

  return (
    <>

    <div className='flex flex-col w-full'>
          <div className='w-full flex flex-col '>
                <img 
                src={bg}
                className="w-full h-56"
                />
             <div className=' px-28 flex items-center '>

                   {seller?.img?.length >0?

                    <img 
                      src={seller?.img}
                      className="w-56 h-56 rounded-full -mt-20 p-3"
                      style={{background:"white"}}
                   />
                      :
                        <div  className="w-44 h-44 rounded-full -mt-20 p-3 flex justify-center items-center" style={{background:"white"}}>
                              <h5 className='rounded-full bg-orange-400 text-white text-7xl font-semibold h-36 w-36 flex items-center justify-center'>{seller?.name?.slice(0,1)}</h5>
                        </div>
               

                  } 

                    <div className='flex items-center -mt-12'>
                        {/* <h5 className='text text-slate-500'>Seller rating 0 of 5</h5>
                        <h5 className='bg-white flex items-center p-2 rounded-full'>
                                {[1,2,3,4,5].map(()=>{
                                return(
                                    <MdOutlineStar 
                                       className='text-slate-300 '
                                    />
                                )
                                })

                                }

                            </h5>
                         */}
                      </div>




             </div>

          </div>


          <div className='w-full flex justify-end w-full px-28 -mt-20'>

                   <div className='flex  space-x-4 w-1/3 items-center'>
                         {isLoading?
                              <div className='flex justify-center'>
                                   <ClipLoader 
                                      color='#C74A1F'
                                      size={14}
                                   />

                              </div>

                             :
                            <button className='text-white py-3 px-4 text-sm rounded-sm  w-full' style={{background:"#C74A1F"}}
                               onClick={startMsg}
                            >

                            <span>Message seller</span>

                            </button>
                           }

                            <button className='text-blue-600 py-3 space-x-4 px-4 rounded-sm text-sm flex justify-center space-x-4 items-center w-full border border-blue-600 ' 
                               onClick={()=>setTrigger(true)}
                             >
                                <span>Copy sharing link</span>
                                <FiArrowRight
                                    className='text-xl' 
                                />
                        

                            </button>

                    </div>

          </div>     
    </div>
      <Modal trigger={trigger}  cname="w-1/4 py-2  px-8 rounded-lg ">
           <Qrcode
             setTrigger={setTrigger}
            />
      </Modal>
      
    </>
  )
}
