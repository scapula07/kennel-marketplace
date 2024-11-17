import React,{useEffect,useState} from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-b.png"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { onSnapshot,doc } from 'firebase/firestore'
import { db } from '../../modules/firebase';
import { saveTypeState ,accountTypeState,preOrdersTypeState} from '../../modules/recoil/state';
import { useRecoilState ,useRecoilValue} from 'recoil';
import { searchApi } from '../../modules/api/search';
import { useNavigate } from 'react-router-dom';
import { MdBlock} from "react-icons/md";


export default function Menu() {
    const currentUser=useRecoilValue(accountTypeState)
    const [misc,setMisc]=useState({})
    const [saved,setSaved]=useRecoilState(saveTypeState)
    const [preorders,setPreorders]=useRecoilState(preOrdersTypeState)
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
            setPreorders(doc?.data()?.preOrder)
            });
        }
        },[])

  return (
    <div className='w-1/2 h-full text-black py-6 flex text-lg  flex-col items-end px-4 space-y-4'>
             {[{text:"Home",link:"/"},{text:"Marketplace",link:"/market"},{text:"Sellers",link:"/sellers"}].map((item)=>{
                    return(
                        <Link to={item?.link}>
                            <h5 className={`${active ==item?.link ? 'font-light font-semibold text-orange-800':"font-light hover:font-semibold hover:text-orange-800"}`}>{item?.text}</h5>
                        </Link>
                    )})}
                       <Link to={"/messages"}>
                            <h5 className='flex '>
                                <span>Messages</span>
                                 {unseen?.msg&&
                                    <span className='bg-red-500 lg:h-3 lg:w-3 h-1 w-1 rounded-full -ml-3 mt-0.5'></span>
                                    }
                            </h5>
                        </Link>
        
                        <Link to={`/notifications`}>
                            <h5 className='flex '>
                                <span>Notifications</span>
                                {unseen?.notifications&&
                                <span className='bg-red-500 lg:h-3 lg:w-3 h-1 w-1 rounded-full -ml-3 mt-0.5'></span>
                                }
                            </h5>
                        </Link>
               <>
                {currentUser?.role==="breeder"?
                    <>
                    {currentUser?.status==="active"?
                    <Link to="/admin-seller">
                        <button className='text-white py-1.5 text-sm px-4 rounded-lg border-orange-700 border-2 ' style={{color:"#C74A1F"}}>I'm a breeder</button>
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
                                    I'm a breeder
                                </button>
                            </Link>
                        }
                    </> }
                    </>
                        :             
                    <Link to={`${currentUser?.id?.length ==undefined? "/login":"/breeder" }`}>
                        <button className='text-white py-1.5 text-sm px-4 rounded-lg ' style={{background:"#C74A1F"}}>I'm a breeder</button>
                    </Link>
                    }
                </>




    </div>
  )
}
