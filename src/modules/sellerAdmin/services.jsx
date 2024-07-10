import React ,{useState,useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where,orderBy}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { MdOutlineCheckBoxOutlineBlank, } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { serviceApi } from '../api/service';
import Fuse from "fuse.js"


const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];





export default function Services() {

        const [products,setProducts]=useState([])
        const [areContacts,setContacts]=useState("")
        const [searchQuery,setQuery]=useState("")
        const currentUser=useRecoilValue(accountTypeState)

        useEffect(()=>{
           if(currentUser?.id?.length >0){         
                const q = query(collection(db, "services"),where('creator','==',currentUser?.id));
                    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const products = []
                    querySnapshot.forEach((doc) => {
                        products.push({ ...doc.data(), id: doc.id })
            
                    });
            
                    products?.length===0 &&setContacts("No contact")
                    products?.length >0 &&setContacts("")
                    setProducts(products)
                });

             }
        
            },[currentUser])
 

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
       keys:["name","sku","price"]
     })

    const result=fuse.search(searchQuery)
  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-black font-light text-sm'>Breeder/Services</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-8 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-xl font-semibold text-black'>All Services</h5>

                              <div className='flex items-center'>
                              <Link to="/admin-seller/add-service" >
                              <button className='bg-orange-400 text-white rounded-lg py-2 px-4 text-sm'>+ New service</button>
                              </Link>


                              </div>

                        </div>

                        <div className='flex w-full justify-start'>
                                 <div className='border py-1.5 px-3 rounded-lg flex w-2/5 justify-between bg-white'>
                                    <input
                                       placeholder='Search with product name,category ,price or sku '
                                       className='outline-none border-0 w-full text-sm font-light '
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
                                <div className='w-full flex justify-center '>
                                    <ClipLoader 
                                          color={"orange"}
                                          loading={true}
                                    />
                                </div>
                                }
                                                    
                                {products?.length ===0&&areContacts?.length >0&&
                                <div className='w-full flex justify-center  top-0'>
                                <h5 className="text-sm font-semibold">You have no service</h5>
                                </div>
                                }

                            
                </div>


              
    
    
    
    </div>
  )
}



const Table=({products,result})=>{
      return(
        <div>
            <table class="table-auto w-full border-separate border-spacing-0.5 ">
                    <thead className='py-2'>
                    <tr >
                          {
                            ["Service"
                            ,
                              "Catagories",
                            "Price",
                            "Action"

                            ].map((text)=>{
                                return(
                                <th className='py-1 text-xs text-slate-500 text-start'>{text}</th>
                            )
                            })
                        }
                             </tr>
                        
                    </thead>

                    <tbody className='w-full overflow-y-scroll min-h-min'>
                        
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

      const deleteProduct=async()=>{
                setisDeleting(true)
            try{
               const res=await serviceApi.deleteProduct(product)
              res&&setisDeleting(false)
              }catch(e){
                setisDeleting(false)
                console.log(e)
              }
          }
    return(
      <tr className={`${onSelect?'border-b shadow-lg py-4 ':'border-b'}`}>
      <td className='flex items-center space-x-8 py-2'>
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
          
          <Link to="" state={{product}}>
                <span className='font-semibold text-slate-400 hover:underline flex space-x-4'>
                    <img src={product?.images[0]}
                        className="h-8 w-8 rounded-lg"
                      />
                      <span>  {product?.name}</span>
                    
                    
                  </span>
            </Link>
     
      </td>  
    
 
      <td className='text-sm font-light text-slate-500 py-2'>
         <select>
            {product?.category?.map((opt)=>{
               return(
                <option>{opt?.value}</option>
               )
            })

            }

         </select>
       
        </td>
      <td className='text-sm font-light text-slate-500 py-2'>${product?.price}</td>
     
  
      {/* <td className='text-xs font-semibold  px-2  rounded-lg py-2 '>
             <span className='font-semibold text-slate-500 text-green-600 bg-green-300 px-4 py-1 rounded-sm'>
                  {product?.status?.value}
              </span>
      </td> */}

      <td className='text-xs font-semibold  px-2  rounded-lg flex items-center  space-x-3 py-2'>
            <FaRegUser
              className={`${onSelect?'text-xl font-light text-orange-500 hover:text-orange-400 ':'text-lg text-slate-500'}`}
             />
           <Link to={`${onSelect?"/admin-seller/product":""}`} state={product?.id}>
                <IoEyeSharp 
                className={`${onSelect?'text-xl text-orange-500 font-light hover:text-orange-400':'text-lg text-slate-500'}`}
                />
            </Link>
            {ondelete?
               <ClipLoader
                 color='red'
                 size={14}
                />
               :
               <MdDelete 
                  onClick={()=>onSelect&&deleteProduct()}
                  className={`${onSelect?'text-2xl text-red-500 font-light hover:text-red-400':'text-lg text-slate-500'}`}
                />

            }

         
      </td>
    

 </tr>

    )
}