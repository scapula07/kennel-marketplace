import React,{useEffect,useState} from 'react'
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-b.png"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../modules/firebase';
import { saveTypeState ,accountTypeState} from '../../modules/recoil/state';
import { useRecoilState ,useRecoilValue} from 'recoil';
import Modal from "../modal"
import { searchApi } from '../../modules/api/search';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { MdBlock,MdOutlineLock } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

export default function Header() {
     const currentUser=useRecoilValue(accountTypeState)
     const [misc,setMisc]=useState({})
     const [saved,setSaved]=useRecoilState(saveTypeState)
     const user = localStorage.getItem("user");
     const [isLoading,setLoading]=useState(false)
     
     const currentURL = window.location.href;
     const parts = currentURL?.split('/');
     const lastPart = parts[parts.length - 1];
 
     const part =`${"/" +lastPart}`
     const [active,setActive]=useState(part)
     const [search,setSearch]=useState("")
     const [unseen,setUnseen]=useState()

     const navigate=useNavigate()

  
   
 
     useEffect(()=>{
         if(currentUser?.id?.length >0){
            const ref =doc(db,"misc",currentUser?.id)
            const unsub = onSnapshot(ref, (doc) => {
            console.log(doc?.data(),"unseee nn")
            setUnseen(doc?.data())
            });
  
  
         }
       },[currentUser])
 

   
   
    useEffect(()=>{
    
      if(JSON.parse(user)?.id?.length >0){
         const ref =doc(db,"misc",JSON.parse(user)?.id)
         const unsub = onSnapshot(ref, (doc) => {
         setMisc(doc?.data())
         setSaved(doc?.data()?.saved)
         });


      }
    },[])



    const onSearch=async()=>{
           setLoading(true)
        try{
             const res=await searchApi.globalSearch(search)
            setLoading(false)
            navigate('/search',{state:res})
         }catch(e){
            setLoading(false)
            console.log(e)
        }
    }


  return (
    <>
      <div className='w-full relative'>



           <div className='flex items-center w-full px-10'>
                 <div className='w-1/2 flex justify-center space-x-6'>
                    <div>
                        <img 
                          src={logo}
                          className="w-20 h-8"
                        />

                    </div>
                     <div className='border py-1 px-3 rounded-lg flex w-1/2 justify-between items-center'>
                        <input
                           placeholder='Search products,sellers and category'
                           className='outline-none border-0 w-full text-xs text-black'
                           onChange={(e)=>setSearch(e.target.value)}
                          />
                         {search?.length >0?
                            <button className='py-2 text-white px-4 rounded-sm text-xs font-semibold bg-orange-600'
                              onClick={()=>!isLoading&&onSearch()}
                            >
                               {!isLoading?
                                 "  Search"
                                 :
                                 <ClipLoader size={10} color="white" />


                               }
                             
                             </button>

                              :
                              <FiSearch
                              className='text-slate-600'
                             />


                         }
                      

                     </div>


                 </div>




                 <div className='flex items-center w-1/2 justify-end' >
                     <div className='flex items-center justify-between w-3/4 text-sm'>
                            {[{text:"Home",link:"/"},{text:"Marketplace",link:"/market"},{text:"Sellers",link:"/sellers"}].map((item)=>{
                                return(
                                   <Link to={item?.link}>
                                       <h5 className={`${active ==item?.link ? 'font-light font-semibold text-orange-800':"font-light hover:font-semibold hover:text-orange-800"}`}>{item?.text}</h5>
                                   </Link>
                          

                                )
                              })

                             }

                            

                           
                            {currentUser?.role==="admin"?
                               <Link to="/admin">
                                    <h5 className=' font-light hover:font-semibold hover:text-orange-800 text-sm'>Admin Dashboard</h5>
                               </Link>
                                

                                 :
                                 <>
                                 {currentUser?.role==="breeder"?
                                      <>
                                       {currentUser?.status==="active"?
                                        <Link to="/admin-seller">
                                            <button className='text-white py-1.5 text-sm px-4 rounded-lg border-orange-700 border-2 ' style={{color:"#C74A1F"}}>I'm a breader</button>
                                        </Link>
                                        :
                                        <>
                                            {currentUser?.status==="blocked"?
                                              <button className='text-white py-1.5 text-sm px-4 rounded-lg border-orange-700 border-2 ' style={{color:"#C74A1F"}}>
                                                   <MdBlock
                                                     className="bg-orange-400 text-white rounded-full p-1 text-2xl"
                                                  />
                                              </button>
                                              :
                                              <Link to="/admin-seller">
                                                  <button className='text-white py-1.5 text-sm px-4 rounded-lg border-orange-700 border-2 ' style={{color:"#C74A1F"}}>
                                                    
                                                      I'm a breader
                                                  </button>
                                              </Link>
                                            }
                                        </>


                                        }
                                      </>
                                      :
                                  
                                      <Link to={`${currentUser?.id?.length ==undefined? "/login":"/breeder" }`}>
                                          <button className='text-white py-1.5 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>I'm a breader</button>
                                      </Link>
                                    }
                                    </>
                                }
                           
                             {currentUser?.id?.length >0?
                                <div className='flex items-center space-x-2'>
                                       <Link to={"/account"}>
                                          {currentUser?.img?.length ===0?
                                               <h5 className='rounded-full bg-orange-400 text-white font-semibold text-sm p-1 border-2 border-white lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center'
                                               >
                                                                      {currentUser?.name?.slice(0,1) }
                                                                    
                                                    
                                                 </h5>
                                                 :
                                                 <img 
                                                    src={currentUser?.img}
                                                    className="rounded-full lg:w-8 lg:h-8 w-6 h-6"
                                                 
                                                 />


                                              }
                                     
                                        </Link>
                                        <Link to={"/messages"}>
                                          <h5 className='flex '>
                                              <IoChatbubbleEllipsesOutline 
                                                  className="text-2xl font-light text-slate-500"
                                              />
                                                {unseen?.msg&&
                                                    <span className='bg-red-500 lg:h-3 lg:w-3 h-1 w-1 rounded-full -ml-3 mt-0.5'></span>
                                                  }
                                          </h5>
                                     </Link>
                                     <Link to={`/notifications`}>
                                           <h5 className='flex '>
                                                <IoIosNotificationsOutline
                                                    className="text-2xl font-light text-slate-500"
                                                />
                                               {unseen?.notifications&&
                                                <span className='bg-red-500 lg:h-3 lg:w-3 h-1 w-1 rounded-full -ml-3 mt-0.5'></span>
                                              }
                                          </h5>
                                     </Link>

                                </div>
                                :
                              <Link to={"/login"}>
                              <button className='text-slate-600 py-1.5 text-sm px-4 rounded-lg border border-blue-600'>Login</button>
                              </Link>

                              }
                                {currentUser?.id?.length >0&&
                              <Link to={"/cart"}
                                  state={{
                                    products:misc?.cart
                                    }}
                                >
                                <div className='flex'>
                                  <MdOutlineShoppingCart 
                                      className='text-2xl' 
                                  />
                                  {misc?.cart?.length >0&&
                                          <h5 className='text-xs bg-orange-600 rounded-full flex items-center justify-center h-4 w-4 text-white '>{misc?.cart?.length}</h5>


                                  }
                            
                                </div>
                            
                              </Link>}


                     </div>
                   
           
                    
                 </div>

           </div>

        

        </div>
       
        </>
  )
}
