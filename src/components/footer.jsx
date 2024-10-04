import React from 'react'
import logo from "../assets/logo white.png"
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { accountTypeState } from '../modules/recoil/state'

export default function Footer() {
     const currentUser=useRecoilValue(accountTypeState)
  return (
    <div className='w-full flex  px-20 py-8 text-sm'  style={{background: "#282828"}}>
          <div className='w-1/2 flex flex-col space-y-10'>
               <div className='flex '>
                    <img
                      src={logo} 
                      className=""
                   />
                   {/* <div className='flex flex-col'>
                      <h5 className='text-white font-light text-2xl'>Kennel</h5>
                      <h5 className='text-white font-semibold text-2xl'>Breeders</h5>

                   </div> */}

               </div>

               <div className='w-full'>
                   <h5 className='text-white font-semibold w-1/2 text-xl'>Join our newsletter to stay up to date on features and releases</h5>

               </div>

               <div className='flex flex-col space-y-4'>
                     <div className='flex  space-x-3'>
                          <input
                              className='py-2 rounded-lg w-1/3 px-2'
                              placeholder='yourmail@info.com'
                           />
                            <button className='text-white py-2 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>Subscribe</button>

                     </div>

                     <h5 className='text-xs text-slate-400 w-3/5'>By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.</h5>

               </div>

               <div>
                  <h5 className='text-white font-light'>2024. Kennel Breeders. All rights reserved</h5>
               </div>


          </div>
          <div className='w-1/2 text-white'>
               <div className='w-full flex justify-between text-sm'>
                   <div className='flex flex-col space-y-4'>
                        <h5 className='font-semibold text-lg'>Main menu</h5>
                        <Link to="/">
                            <h5 className='font-extralight'>Home</h5>
                        </Link>
                    <Link to="/market">
                       <h5 className='font-extralight'>Marketplace</h5>
                    </Link>
                    <Link to="/sellers">
                          <h5 className='font-extralight'>Sellers</h5>
                    </Link>
                  

                   </div>

                   <div className='flex flex-col space-y-4'>
                        <h5 className='font-semibold text-lg'>Personal</h5>
                        <Link to={currentUser?.id?.length >0?"/account":""}>
                           <h5 className='font-extralight'>My profile</h5>
                        </Link>

                   </div>

                   <div className='flex flex-col space-y-4'>
                        <h5 className='font-semibold text-lg'>Socials</h5>
                        <h5 className='font-extralight'>Facebook</h5>
                        <h5 className='font-extralight'>Instagram</h5>
                        <h5 className='font-extralight'>Twitter</h5>
                        <h5 className='font-extralight'>Linked in</h5>

                   </div>

               </div>

          </div>

    </div>
  )
}
