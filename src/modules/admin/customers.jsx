import React ,{useState,useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where,orderBy}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Fuse from "fuse.js"
import { MdDelete } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank, } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import { authApi } from '../api/auth';

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];





export default function Customers() {

        const [products,setProducts]=useState([])
        const [areContacts,setContacts]=useState("")
        const [searchQuery,setQuery]=useState("")


        useEffect(()=>{
        
            const q = query(collection(db, "users"),where('role','==','user'));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const products = []
                  querySnapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })
        
                  });
        
                  products?.length===0 &&setContacts("No contact")
                  products?.length >0 &&setContacts("")
                   setProducts(products)
            });
        
        },[])
        console.log(products,"pp")

        const fuse =new Fuse([...products],{
          isCaseSensitive: false,
          includeScore: true,
          shouldSort: true,
          includeMatches: false,
          findAllMatches: false,
          minMatchCharLength: 2,
          location: 0,
          threshold: 0.2,
          distance: 100,
          useExtendedSearch: true,
          ignoreLocation: false,
          ignoreFieldNorm: false,
          fieldNormWeight: 1,
       keys:["name","email","Specialty"]
     })

     const result=fuse.search(searchQuery)

  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Admin/Customers</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-8 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-xl font-semibold text-black'>All Customers</h5>

                              <div className='flex items-center'>
                          


                              </div>

                        </div>

                        <div className='flex w-full justify-start'>
                                 <div className='border py-2 px-3 rounded-sm flex w-1/4 justify-between bg-white text-black'>
                                 <input
                                       placeholder='Search with name,email '
                                       className='outline-none border-0 w-full text-sm font-light text-xs  '
                                       onChange={(e)=>setQuery(e.target.value)}
                                    
                                      />
                                    <FiSearch
                                       className='text-slate-600'
                                    />

                                </div>

                        </div>

                        <Table 
                           products={products}
                           result={result}
                        />

                             {products?.length ===0&&areContacts?.length ==0&&
                                <div className='w-full flex justify-center py-5 '>
                                    <ClipLoader 
                                          color={"orange"}
                                          loading={true}
                                    />
                                </div>
                                }
                                                    
                                {products?.length ===0&&areContacts?.length >0&&
                                <div className='w-full flex justify-center  py-5'>
                                <h5 className="text-sm">No contacts</h5>
                                </div>
                                }

                </div>


              
    
    
    
    </div>
  )
}



const Table=({products,result})=>{
      return(
        <div>
            <table class="table-auto w-full border-separate  border-spacing-1">
                    <thead className='py-2 '>
                    <tr >
                          {
                            ["User",
                              "Email",
                            "Phone no.",
                            "Action"
                            ].map((text)=>{
                                return(
                                <th className='py-1 border  text-xs text-slate-500 text-start px-2 py-2'>{text}</th>
                            )
                            })
                        }
                             </tr>
                        
                    </thead>

                    <tbody className='w-full '>
                    {result?.length ==0 &&products?.map((product)=>{
                            return(
                                  <Row product={product}/>

                              )
                          })

                        }
                     {result?.length >0 &&result?.map((product)=>{
                            return(
                                  <Row product={product?.item}/>

                              )
                          })

                        }


                 
                     


                    </tbody>
                

     </table>

        </div>
      )
}







const Row=({product})=>{
  const [onSelect,setSelect]=useState(false)
  const [ondelete,setisDeleting]=useState(false)
  const deleteUser=async()=>{
    setisDeleting(true)
    try{
    const res=await authApi.deleteUser(product)
    res&&setisDeleting(false)
    }catch(e){
        setisDeleting(false)
        console.log(e)
    }
}
    return(
      <tr className={`${onSelect?'border-b shadow-lg py-4 ':'border-b'}`}>
         <td className='flex items-center space-x-8  border border px-2 py-1.5'>
                {onSelect?
                    <IoMdCheckbox
                    className="text-2xl text-orange-500"
                    onClick={()=>setSelect(false)}
                  />
                      :
                  <MdOutlineCheckBoxOutlineBlank
                      className="text-lg text-orange-500"
                      onClick={()=>setSelect(true)}
                    />

                  } 
            <Link to="/seller" state={{seller:product}} className="flex items-center space-x-2">
                
              {product?.img?.length ===0?
                        <h5 className='rounded-full bg-orange-400 text-white font-semibold text-sm p-1 border-2 border-white lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center'
                        >
                          {product?.name?.slice(0,1) }
                                            
                            
                          </h5>
                          :
                          <img 
                            src={product?.img}
                            className="rounded-full lg:w-8 lg:h-8 w-6 h-6"
                          
                          />


                    }
                 <span className='font-semibold text-slate-400 hover:underline '>
                      {product?.name}
                  </span>

                  
            </Link>
     
    </td>  
    
 
      <td className='text-sm font-light text-slate-500  border border px-2'>{product?.email}</td>
      <td className='text-sm font-light text-slate-500  border border px-2'>{product?.phone}</td>
      <td className='text-xs font-semibold  px-2    flex items-center  space-x-3 py-2  border px-2'>
        
             
            {ondelete?
               <ClipLoader
                 color='red'
                 size={14}
                />
               :
               <MdDelete 
                  onClick={()=>onSelect&&deleteUser()}
                  className={`${onSelect?'text-2xl text-red-500 font-light hover:text-red-400':'text-lg text-slate-500'}`}
                />

            }

         
      </td>
   

    

 </tr>

    )
}