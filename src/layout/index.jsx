import React from 'react'
import Header from '../components/header'

export default function Layout({children}) {
  return (
    <div className='w-full h-full relative'>

        <div className='w-full py-6 fixed z-40 bg-white'>
            <Header />

        </div>


        <div className='w-full py-24 h-full' style={{background:"#fbfbfb"}}>
            {children}
        </div>
    </div>
  )
}
