import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';
export default function Sections() {
  const currentURL = window.location.href;
  const parts = currentURL?.split('/');
  const lastPart = parts[parts.length - 1];
  console.log(lastPart,"lastp"); 
  const part =`${"" +lastPart}`
     
  return (
      <div className='py-4 flex flex-col w-full px-28'>
           <div className='w-full'>
                <div className='border rounded-full flex items-center w-3/6 justify-between '>
                {[{text:"Home",link:""},{text:"Products",link:"products"},{text:"Services",link:"services"},{text:"Seller Information",link:"information"}].map((item)=>{
                     return(
                      <>
                      {part ==="seller"?
                            <Link to={item?.link}>
                                      <button className={`${"" ==item?.link?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`}>{item?.text}</button>
                              </Link>
                              :
                              <Link to={item?.link}>
                              <button className={`${part ==item?.link?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`}>{item?.text}</button>
                           </Link>


                      }
                   
                      </>
                   

                     )

                })}

                </div>

           </div>


           <div className='w-full '>
                <Outlet />
           </div>
            
          

      </div>
  )
}
