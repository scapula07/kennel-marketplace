import React from 'react'
import bg from "../../assets/imgbg.png"
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Signup() {
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
                                onClick={()=>window.history.go(-1)}
                                />

                            </div>

                            <div className='flex flex-col space-y-6 '>
                                  <div className='flex flex-col items-center space-y-5'>
                                       <h5 className='text-4xl font-semibold'>Sign Up</h5>
                                       <h5 className='text-slate-500'>Lorem ipsum dolor sit amet.</h5>

                                  </div>

                                  <div className='flex flex-col space-y-3 py-4'>
                                        {
                                          [ 
                                            {
                                                label:"Full name",
                                                 desc:"Enter your name"

                                            },
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

                                  </div>



                                  <div className='flex flex-col w-full pt-3 space-y-6 items-center pb-2'>
                                       <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                                                     <span>Sign up</span>

                                        </button>

                                        <div className='flex items-center'>
                                             <h5>Already have an account?</h5>
                                             <Link to={"/login"}>
                                             <h5 className='text-blue-500'>Login</h5>
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
