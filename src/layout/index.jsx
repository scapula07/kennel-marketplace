import React,{useState} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { useRecoilState } from 'recoil'
import { alertTypeState } from '../modules/recoil/state'
import { IoCloseCircle } from "react-icons/io5";
import MobileHeader from '../components/header/mobile'
import Menu from '../components/header/menu'

export default function Layout({children}) {
      const [alert,setAlert]=useRecoilState(alertTypeState)
      const [isMenu,setMenu]=useState(false)
  return (
    <div className='w-full h-full relative overflow-x-hidden'>
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

            <div className='w-full md:py-6 py-2 fixed z-40 bg-white '>
                <div className='w-full hidden md:block'>
                    <Header />
                </div>
                <div className='md:hidden block relative'>
                    <MobileHeader
                      setMenu={setMenu}
                      isMenu={isMenu}
                    />
                </div>
             
            </div>
              {isMenu?
                   <div className='h-[60vh] w-full flex justify-end pt-20'>
                          <Menu />
                    </div>
                    :
                <div className='w-full py-24 h-full' style={{background:"#fbfbfb"}}>
                    {children}
                 </div>
                }
            <div className='w-full'>
                <Footer />
            </div>
 
    </div>
  )
}
