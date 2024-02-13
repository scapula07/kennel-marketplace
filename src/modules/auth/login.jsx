import React,{useState} from 'react'
import bg from "../../assets/imgbg.png"
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { ClipLoader } from 'react-spinners';

export default function Login() {

  const [credentail,setCred]=useState({})
  const [loader,setLoader]=useState(false)
  let navigate = useNavigate();
  console.log(credentail,"cred")

  const login=async()=>{
     try{
         setLoader(true)
         const user=await authApi.login(credentail?.email,credentail?.password)

       
         setLoader(false)
         localStorage.clear();
         localStorage.setItem('user',JSON.stringify(user));

         user?.id.length >0&& navigate(`/`)

     }catch(e){
       console.log(e)
       setLoader(false)
     }
  }
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
                                       <h5 className='text-4xl font-semibold'>Log in</h5>
                                       <h5 className='text-slate-500'>Lorem ipsum dolor sit amet.</h5>

                                  </div>

                                  <div className='flex flex-col space-y-3 py-4'>
                                        {
                                          [ 
                                            {
                                                label:"Email",
                                                desc:"Enter your email",
                                                value:credentail?.email,
                                                click:(e)=>setCred({...credentail,email:e.target.value})

                                            },
                                            {
                                                label:"Password",
                                                desc:"Enter your password",
                                                value:credentail?.password,
                                                click:(e)=>setCred({...credentail,password:e.target.value})

                                            }
                                            
                                          ].map((item)=>{
                                            return(
                                                <div className='flex flex-col space-y-1'>
                                                    <label className='text-slate-500 text-lg font-light'>{item?.label}</label>
                                                    <input 
                                                       placeholder={item?.desc}
                                                       className="outline-none border py-3 px-2 rounded-xl "
                                                       onChange={(e)=>item?.click(e)}
                                                    />
                                                </div>
                                            )
                                          })

                                        }
                                        <p className='text-blue-500 text-lg font-light'>Forgot your password?</p>

                                  </div>



                                  <div className='flex flex-col w-full pt-3 space-y-6 items-center pb-2'>
                                        {!loader?
                                            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}
                                              onClick={login}
                                            >
                                              <span>Login</span>

                                            </button>
                                               :
                                               <ClipLoader 
                                                 color="#C74A1F"
                                                 loading={true}
                                               />

                                          }


                                        <div className='flex items-center'>
                                             <h5>Don't have an account?</h5>
                                             <Link to={"/signup"}>

                                             <h5 className='text-blue-500'>Signup</h5>
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
