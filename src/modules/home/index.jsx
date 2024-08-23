import React ,{useEffect} from 'react'
import Layout from '../../layout'
import HeroSection from './components/heroSection'
import Featured from './components/featured'
import Breeders from './components/breeders'
import separate from "../../assets/separator.png"
import Upcoming from './components/upcoming'
import Kennel from './components/kennel'
import TopProduct from './components/top'


export default function Home() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
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
                   <div className=''>

                   </div>
                   <img 
                      src={separate}
                   />
              </div>

              <div className='w-full flex justify-center'>
                <Upcoming />
              </div>
               

              <div className='w-full flex flex-col space-y-10'>
                   <img 
                      src={separate}
                   />
                   <div className='w-full flex justify-center'>
                    <Kennel />


                   </div>
                   <div className=''>

                   </div>
                   <img 
                      src={separate}
                   />
              </div>
              <div className='w-full flex justify-center'>
                <TopProduct />
              </div>

              



  


            
        </div>

    </Layout>

  )
}
