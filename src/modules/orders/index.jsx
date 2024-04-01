import React,{useEffect} from 'react'
import Layout from '../../layout'
import { Outlet } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Orders() {
    const [active,setActive]=useState("")
    useEffect(() => {
       
        window.scrollTo(0, 0);
   
      
    }, []);
  
    useEffect(()=>{
        const currentURL = window.location.href;
        const parts = currentURL?.split('/');
        const lastPart = parts[parts.length - 1];
        setActive(lastPart )

    })

    console.log(active)

 
  return (

    <Layout>
        <div className='w-full h-full flex  justify-center py-10 '>
                <div className='flex flex-col w-3/4 space-y-6'> 
                        <div className='flex w-full justify-between '>
                            <h5 className='text-4xl font-semibold '>My orders</h5>

                        </div>



                        <div className='flex items-center justifu-between w-full'>
                            <div className='border py-2 px-3 rounded-lg flex w-1/4 justify-between'>
                                    <input
                                    placeholder='Search'
                                    className='outline-none border-0 w-3/5'
                                    />
                                    <FiSearch
                                    className='text-slate-600'
                                    />

                                </div>

                   </div>



                        <div className='w-full py-10 '>
                                <div className='border rounded-full flex items-center w-1/3 justify-between'>
                                {[{text:"Active",link:""},{text:"Completed",link:"completed"},{text:"Cancelled",link:"cancelled"}].map((item)=>{
                                                const part =`${"/" +item?.link}`
                                                return(
                                                <>
                                                {active ==="orders"?
                                                        <Link to={item?.link}>
                                                                <button className={`${"" ==item?.link?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`} onClick={()=>setActive(item?.link)}>{item?.text}</button>
                                                        </Link>
                                                        :
                                                        <Link to={item?.link}>
                                                        <button className={`${active ==item?.link?'rounded-full py-3 bg-green-900 px-6 text-white text-sm':'rounded-full py-3 hover:bg-green-900 px-6 text-black hover:text-white text-sm'}`} onClick={()=>setActive(item?.link)}>{item?.text}</button>
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

                   


    </div>

    </Layout>
  )
}
