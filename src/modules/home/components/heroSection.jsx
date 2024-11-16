import React from 'react'
import bg from "../../../assets/horse.png"
import bg1 from "../../../assets/lizard.png"
import bg2 from "../../../assets/nurse.png"
import { Link } from 'react-router-dom'
export default function HeroSection() {
  return (
    <div className='w-full'>
         <div className='w-full flex flex-col md:flex-row '>
              <div className='relative w-full md:w-1/2 md:h-[550px] h-56' >
                  <img 
                    src={bg}
                    className="w-full h-full"
                  />
                    <div className='absolute top-0 w-full h-full z-30 '>
                         <div className='flex w-full h-full justify-end items-center md:px-10 px-20'>
                                <div className='md:w-2/5 flex flex-col space-y-4  '>
                                    <h5 className='md:text-6xl text-2xl font-bold'>Animal <br></br> Breeding</h5>
                                    <Link to="/market">
                                       <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Go to category</button>
                                   </Link>
                                </div>
                           </div>
                      </div>
               </div>

                <div className='flex flex-col w-full lg:w-1/2'>
                        <div className='relative w-full md:h-[275px] h-56'>
                             <img 
                                src={bg1}
                                className="w-full h-full"       
                             />                  
                             <div className='absolute top-0 w-full h-full z-30 '>
                                    <div className='flex w-full h-full justify-end items-center px-20'>
                                            <div className='md:w-2/5 flex flex-col space-y-4  '>
                                                <h5 className='md:text-4xl text-2xl font-bold'>Products</h5>
                                                <Link to="/market">
                                                     <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Go to category</button>
                                                </Link>
                                            </div>
                                    </div>
                                  </div>
                         </div>

                        <div className='relative w-full md:h-[275px] h-56' >
                             <img 
                                 src={bg2}
                                 className="w-full h-full"
                                
                              />
                                <div className='absolute top-0 w-full h-full z-30 '>
                                        <div className='flex w-full h-full justify-end items-center px-20'>
                                                <div className='md:w-2/5 flex flex-col space-y-4  '>
                                                    <h5 className='md:text-4xl text-2xl font-bold'>Services</h5>
                                                    <Link to="/sellers">
                                                    <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Go to category</button>
                                                  </Link>
                                                </div>

                                        </div>
                                    </div>
                            </div>
               </div>

          </div>

    </div>
  )
}
