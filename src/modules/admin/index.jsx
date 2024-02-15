import React from 'react'
import SidePanel from './components/sidePanel'
import Header from './components/header'
import { Outlet } from 'react-router-dom'

export default function Admin() {
  return (
   <div className='w-full overflow-x-hidden overflow-y-hidden h-screen pt-6 pb-4 px-10 admin' 
        // style={{background: "rgba(242, 242, 242, 0.6)"}}
        >
           <div className='flex w-full h-full relative '>
                 <div className='w-1/4  h-full overflow-y-hidden lg:flex  hidden px-8'>
                      <SidePanel />

                </div>
                <div className='lg:w-5/6 w-full relative pt-8 lg:px-2 px-4 h-full'>
                       <div>
                           <Header />
                       </div>

                       <div className='lg:pt-8 pt-8 overflow-y-auto h-full w-full no-scrollbar'>
                          <Outlet context={[""]}/>

                       </div>

                </div>
            

           </div>

      </div>
  )
}
