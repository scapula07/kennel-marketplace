import React,{useState} from 'react'
import bg from "../../assets/imgbg.png"
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { ClipLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { accountTypeState } from '../recoil/state';

export default function Login() {
  const [currentUser,setcurrentUser]=useRecoilState(accountTypeState)
  const [credentail,setCred]=useState({})
  const [loader,setLoader]=useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  let navigate = useNavigate();
  

  const login=async()=>{
    setErrorMsg(null)
      if (credentail?.name?.length < 3) {
        setErrorMsg(' Location is invalid ');
        setLoader(false);
        return;
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentail?.email)){
          setErrorMsg( "email is invalid" );
          setLoader(false);
      }

      if (credentail?.password.length < 8) {
        setErrorMsg( "Password should be atleast 8 characters" );
        setLoader(false);
        return;
      }
     try{
         setLoader(true)
         const user=await authApi.login(credentail?.email,credentail?.password)

       
         setLoader(false)
         localStorage.clear();
         localStorage.setItem('user',JSON.stringify(user));
         setcurrentUser(user)
         console.log(user,"userr")
        //  user?.role ==="admin" && navigate(`/admin`)
        //  user?.role ==="user" && navigate(`/market`)
        //  user?.role ==="breeder"&&user?.status ==="pending"? navigate(`/admin-seller/kyc`): navigate(`/admin-seller`)
        switch (user?.role) {
        
          case 'admin':
            navigate(`/admin`)
          break;
          case 'user':
            navigate(`/market`)
          break;
          case 'breeder':
            if(user?.status==="pending"){
              navigate(`/admin-seller/kyc`)
            }else if(user?.status==="active"){
              navigate(`/admin-seller`)
            }else{
              navigate(`/market`)
            }
          
        }

     }catch(e){
         setLoader(false)
         setErrorMsg(e?.message)
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
                                       <h5 className='text-xl font-semibold'>Log in</h5>
                                       {/* <h5 className='text-slate-500'>Lorem ipsum dolor sit amet.</h5> */}

                                  </div>
                                  {errorMsg && (
                
                                        <h5 className='text-xs font-semibold text-red-500'>{errorMsg}</h5>
                                   )}
                            

                                  <div className='flex flex-col space-y-3 py-4'>
                                        {
                                          [ 
                                            {
                                                label:"Email",
                                                desc:"Enter your email",
                                                type:"text",
                                                value:credentail?.email,
                                                click:(e)=>setCred({...credentail,email:e.target.value})

                                            },
                                            {
                                                label:"Password",
                                                desc:"Enter your password",
                                                type:"password",
                                                value:credentail?.password,
                                                click:(e)=>setCred({...credentail,password:e.target.value})

                                            }
                                            
                                          ].map((item)=>{
                                            return(
                                                <div className='flex flex-col space-y-1'>
                                                    <label className='text-slate-500 text-lg font-light text-sm'>{item?.label}</label>
                                                    <input 
                                                        type={item?.type}
                                                       placeholder={item?.desc}
                                                       className="outline-none border py-3 px-2 rounded-xl text-xs "
                                                       onChange={(e)=>item?.click(e)}
                                                    />
                                                </div>
                                            )
                                          })

                                        }
                                        <p className='text-blue-500 text-lg font-light text-xs'>Forgot your password?</p>

                                  </div>



                                  <div className='flex flex-col w-full pt-3 space-y-6 items-center pb-2'>
                                        {!loader?
                                            <button className='text-white py-2.5 space-x-4 px-4 rounded-lg flex justify-center items-center w-full text-sm' style={{background:"#C74A1F"}}
                                              onClick={login}
                                            >
                                              <span>Login</span>

                                            </button>
                                               :
                                               <ClipLoader 
                                                 color="#C74A1F"
                                                 loading={true}
                                                 size="12"
                                               />

                                          }


                                        <div className='flex items-center text-xs'>
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
