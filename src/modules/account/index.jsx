import React from 'react'
import Layout from '../../layout'
import breeder from "../../assets/breeder.png"
import { RxArrowRight } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { accountTypeState } from '../recoil/state';
import { useRecoilValue ,useRecoilState} from 'recoil';
import { useNavigate } from "react-router-dom";
import { authApi } from '../api/auth';

export default function Accoount() {
    const [currentUser,setcurrentUser ]=useRecoilState(accountTypeState)
    console.log(currentUser,"accoount")
    let navigate = useNavigate();
  

    const logout=async()=>{
        localStorage.clear();
        try{
             setcurrentUser({})
            const response =await authApi.logout()
            console.log(response,"response")
           
            navigate(`/login`)

        }catch(e){
            console.log(e)
        }

    }
  return (
    <Layout>
            <div className='w-full h-full flex justify-center py-10'>
                 <div className='flex flex-col w-3/4 space-y-10'> 
                          <div className='flex w-full justify-between '>
                              <h5 className='text-4xl font-semibold '>My account</h5>

                              <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600' onClick={logout}>Log out</button>

                          </div>

                          <div className='flex items-center space-x-8'>
                          {currentUser?.img?.length >0?

                                <img 
                                  src={currentUser?.img}
                                  className="w-56 h-56 rounded-full"
                            
                                />
                              :
                                <div  className="w-44 h-44 rounded-full flex justify-center items-center" style={{background:"white"}}>
                                      <h5 className='rounded-full bg-orange-400 text-white text-7xl font-semibold h-36 w-36 flex items-center justify-center'>{currentUser?.name?.slice(0,1)}</h5>
                                </div>


                            } 

                               <div className='flex flex-col space-y-4'>
                                  <h5 className='text-2xl font-semibold '>{currentUser?.name}</h5>
                                  <Link to="/profile">
                                    <button className='text-blue-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>View profile</button>
                                  </Link>
                               

                               </div>

                          </div>


                            <div className='flex flex-col space-y-6 py-4'>
                                 {[
                                    {
                                      label:"My orders ",
                                      link:"/orders"
                                    },
                                    {
                                      label:"Saved ",
                                      link:"/saved"
                                    },
                                    {
                                      label:"Account information ",
                                      link:"/profile"
                                    },
                                    {
                                      label:"Payment methods ",
                                      link:"/payment"
                                    },
                                    // {
                                    //   label:"Settings ",
                                    //   link:"/settings"

                                    // }

                                  ].map((item)=>{
                                     return(
                                        <div className='flex justify-between py-4 px-4 rounded-lg shadow-lg '>
                                           <h5>{item?.label}</h5>
                                           <Link to={item?.link}>
                                            <RxArrowRight  
                                                className='text-blue-600 text-xl'
                                            />
                                           </Link>
                                         



                                        </div>
                                     )
                                 })

                                 }



                            </div>

                 </div>

            </div>

    </Layout>

  )
}
