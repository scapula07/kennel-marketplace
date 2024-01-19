import React from 'react'
import bg from "../../../assets/horse.png"
import bg1 from "../../../assets/lizard.png"
import bg2 from "../../../assets/nurse.png"
export default function HeroSection() {
  return (
    <div className='w-full'>

         <div className='w-full flex  '>

               <div className='relative w-1/2'
                   style={{height:"550px"}}
                 >
                      <img 
                        src={bg}
                        className="w-full h-full"
             
                     />
                     <div className='absolute top-0 w-full h-full z-30 '>
                         <div className='flex w-full h-full justify-end items-center px-10'>
                                <div className='w-2/5 flex flex-col space-y-4  '>
                                    <h5 className='text-6xl font-bold'>Animal <br></br> Breeding</h5>
                                    <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Go to catagrory</button>

                                </div>

                           </div>


                      </div>

               </div>


                <div className='flex flex-col w-1/2'>

                        <div className='relative w-full'
                           style={{height:"275px"}}
                          >
                                <img 
                                src={bg1}
                                className="w-full h-full"
                               
                                />
                                
                             <div className='absolute top-0 w-full h-full z-30 '>
                                    <div className='flex w-full h-full justify-end items-center px-20'>
                                            <div className='w-2/5 flex flex-col space-y-4  '>
                                                <h5 className='text-4xl font-bold'>Products</h5>
                                                <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Go to catagrory</button>

                                            </div>

                                    </div>


                                  </div>
 
                         </div>

                        <div className='relative w-full'
                              style={{height:"275px"}}
                               >
                                <img 
                                    src={bg2}
                                    className="w-full h-full"
                                
                                />

                                <div className='absolute top-0 w-full h-full z-30 '>
                                        <div className='flex w-full h-full justify-end items-center px-20'>
                                                <div className='w-2/5 flex flex-col space-y-4  '>
                                                    <h5 className='text-4xl font-bold'>Services</h5>
                                                    <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Go to catagrory</button>

                                                </div>

                                        </div>


                                    </div>
 

                            </div>

               </div>

          </div>

    </div>
  )
}
