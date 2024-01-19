import React from 'react'
import bg from "../../assets/imgbg.png"
import { IoMdClose } from "react-icons/io";


export default function Login() {
  return (
    <div className='w-full h-screen relative'>
         <img
            src={bg}
            className="w-full h-full blur-lg"
          />

          <div className='absolute top-0 w-full h-full '>
              <div className='w-full h-full flex items-center justify-center relative z-30'>
                   <div className='bg-white w-1/4  rounded-lg  relative z-30 px-6 py-4'>
                            <div className='flex justify-end '>
                                <IoMdClose 
                                className='text-3xl'
                                />

                            </div>

                            <div className='flex flex-col space-y-6 '>
                                  <div className='flex flex-col items-center space-y-5'>
                                       <h5 className='text-4xl font-semibold'>Log in</h5>
                                       <h5 className='text-slate-500'>Lorem ipsum dolor sit amet.</h5>

                                  </div>

                                  <div className='flex flex-col space-y-3 py-4'>
                                        {
                                          [ 
                                            {
                                                label:"Email",
                                                desc:"Enter your email"

                                            },
                                            {
                                                label:"Password",
                                                desc:"Enter your password"

                                            }
                                            
                                          ].map((item)=>{
                                            return(
                                                <div className='flex flex-col space-y-1'>
                                                    <label className='text-slate-500 text-lg font-light'>{item?.label}</label>
                                                    <input 
                                                       placeholder={item?.desc}
                                                       className="outline-none border py-3 px-2 rounded-xl "
                                                    />
                                                </div>
                                            )
                                          })

                                        }
                                        <p className='text-blue-500 text-lg font-light'>Forgot your password?</p>

                                  </div>



                                  <div className='flex flex-col w-full pt-3 space-y-6 items-center pb-2'>
                                       <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                                                     <span>Login</span>

                                        </button>

                                        <div className='flex items-center'>
                                             <h5>Don't have an account?</h5>
                                             <h5 className='text-blue-500'>Signup</h5>

                                        </div>
                                                                        

                                  </div>



                            </div>

                        

                   </div>

              </div>

          </div>
         

    </div>
  )
}
