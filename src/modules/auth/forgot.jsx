import React,{useState} from 'react'
import bg from "../../assets/imgbg.png"
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { ClipLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import { accountTypeState } from '../recoil/state';

export default function ForgetPassword() {
  const [currentUser,setcurrentUser]=useRecoilState(accountTypeState)
  const [credentail,setCred]=useState({email:""})
  const [loader,setLoader]=useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  let navigate = useNavigate();
  console.log(credentail,"cred")


  const reset=async()=>{
    if (credentail?.email.length < 3) {
      setErrorMsg(' Email is invalid ');
      setLoader(false);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentail?.email)){
        setErrorMsg( "Email is invalid" );
        setLoader(false);
    }
     try{
        setLoader(true)
        console.log("resssss")
        const res= await authApi.resetPassword(credentail?.email)
        console.log(res,"resssss")
        res&&setLoader(false)
        res&& navigate(`/login`)
        
        
       }catch(e){
         console.log(e)
         setLoader(false)
         setErrorMsg(e.message)

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

                            <div className='flex flex-col space-y- '>
                                  <div className='flex flex-col items-center space-y-5'>
                                       <h5 className='text-4xl font-semibold'>Forgot Password?</h5>
                                       <h5 className='text-slate-500 text-center'>Enter an email that you used to register in Kennel Breeders platform and we will send you password restoration instructions</h5>

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
                                            
                                          ].map((item)=>{
                                            return(
                                                <div className='flex flex-col space-y-1'>
                                                    <label className='text-slate-500 text-lg font-light'>{item?.label}</label>
                                                    <input 
                                                        type={item?.type}
                                                       placeholder={item?.desc}
                                                       className="outline-none border py-3 px-2 rounded-xl "
                                                       onChange={(e)=>item?.click(e)}
                                                    />
                                                </div>
                                            )
                                          })

                                        }
                                 

                                  </div>



                                  <div className='flex flex-col w-full pt-3 space-y-6 items-center pb-2'>
                                        {!loader?
                                            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}
                                              onClick={reset}
                                            >
                                              <span>Send</span>

                                            </button>
                                               :
                                               <ClipLoader 
                                                 color="#C74A1F"
                                                 loading={true}
                                               />

                                          }


                                        <div className='flex items-center'>
                                            
                                             <Link to={"/signin"}>

                                             <h5 className='text-blue-500'>Back to login</h5>
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
