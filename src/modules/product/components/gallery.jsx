import React from 'react'
import gal1 from "../../../assets/gal1.png"
import gal2 from "../../../assets/gal2.png"
import gal3 from "../../../assets/gal3.png"
import gal4 from "../../../assets/gal4.png"
import gal5 from "../../../assets/gal5.png"

export default function Gallery() {
  return (
    <div className='flex w-full space-x-8 justify-between'>
         <div className='w-1/2'>
              <img 
                src={gal5}
                className="rounded-lg w-full"
              />

         </div>

         
         <div  className='grid grid-flow-row grid-cols-2 gap-x-4 gap-y-2 w-1/2'>
                  {[gal1,gal2,gal3,gal4].map((image)=>{
                      return(
                        <img 
                          src={image}
                            className="rounded-lg w-full"
                        />
                       )
                  })}


         </div>
    </div>
  )
}
