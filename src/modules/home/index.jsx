import React from 'react'
import Layout from '../../layout'
import HeroSection from './components/heroSection'
import Featured from './components/featured'
import Breeders from './components/breeders'
import separate from "../../assets/separator.png"

export default function Home() {
  return (
    <Layout>
        <div className='w-full'>
             <HeroSection />
             <div className='w-full flex justify-center'>
                <Featured />
              </div>

              <div className='w-full flex flex-col space-y-10'>
                   <img 
                      src={separate}
                   />
                   <div className='w-full flex justify-center'>
                      <Breeders/>
                   </div>
                   <img 
                      src={separate}
                   />
              </div>
  


            
        </div>

    </Layout>

  )
}
