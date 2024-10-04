import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useRecoilValue,useRecoilState } from 'recoil'
import { alertTypeState } from '../modules/recoil/state'
import { IoCloseCircle } from "react-icons/io5";

export default function Layout({children}) {
      const [alert,setAlert]=useRecoilState(alertTypeState)
  return (
    <div className='w-full h-full relative'>
           {alert&&
               <div className={`${alert?.color =="danger"?"bg-red-400":"bg-green-500"} w-full h-10 fixed z-50`}>                  
                        <div className='flex justify-center w-full py-2 items-center space-x-6'>
                              <h5 className='text-white'>{alert?.text}</h5>
                              <IoCloseCircle 
                                 className='text-white text-2xl '
                                 onClick={()=>setAlert(null)}
                              />
                        </div> 
               </div>
           }
            <div className='w-full py-6 fixed z-40 bg-white hidden md:block'>
                <Header />
            </div>


            <div className='w-full py-24 h-full hidden md:block' style={{background:"#fbfbfb"}}>
                {children}
            </div>
            <div className='w-full hidden md:block'>
                <Footer />
            </div>

            <div className='w-full sm:block md:hidden h-screen'>
                 <div className='h-full flex flex-col justify-center items-center w-full'>
                    <h5 className='text-lg font-semibold'>Kennel Breeder is coming to mobile soon!</h5>
                    <h5 className='text-lg font-semibold text-slate-700'>Please open on desktop mode</h5>
                 </div>               
            </div>   
    </div>
  )
}
