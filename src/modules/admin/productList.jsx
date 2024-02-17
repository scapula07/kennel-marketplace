import React ,{useState,useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where,orderBy}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];





export default function ProductList() {

        const [products,setProducts]=useState([])
        const [areContacts,setContacts]=useState("")

        useEffect(()=>{
        
            const q = query(collection(db, "products"));
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
  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Admin/Products</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-8 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-xl font-semibold text-black'>All Products</h5>

                              <div className='flex items-center'>
                              <Link to="/admin/new-product" >
                              <button className='bg-orange-400 text-white rounded-lg py-2 px-4 text-sm'>+ New product</button>
                              </Link>


                              </div>

                        </div>

                        <div className='flex w-full justify-start'>
                                 <div className='border py-1.5 px-3 rounded-lg flex w-1/4 justify-between bg-white'>
                                    <input
                                       placeholder='Search'
                                       className='outline-none border-0 w-3/5 text-sm font-light '
                                    
                                      />
                                    <FiSearch
                                       className='text-slate-600'
                                    />

                                </div>

                        </div>

                        <Table 
                           products={products}
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
                                <h5 className="text-sm">No Products</h5>
                                </div>
                                }

                </div>


              
    
    
    
    </div>
  )
}



const Table=({products})=>{
      return(
        <div>
            <table class="table-auto w-full border-separate border-spacing-0.5">
                    <thead className='py-2'>
                    <tr >
                          {
                            ["Product",
                              "Catagory",
                            "Price",
                            "SKU",
                            "Quantity",
                            "status",
                            "Action"

                            ].map((text)=>{
                                return(
                                <th className='py-1 text-xs text-slate-500 text-start'>{text}</th>
                            )
                            })
                        }
                             </tr>
                        
                    </thead>

                    <tbody className='w-full '>
                        
                        {products?.length >0 &&products?.map((product)=>{
                            return(
                                  <Row product={product}/>

                              )
                          })

                        }

                 
                     


                    </tbody>
                

     </table>

        </div>
      )
}







const Row=({product})=>{
    return(
      <tr className='border-b '>
      <td className='flex items-center space-x-8'>
          <input
             type={"checkbox"}
             className="py-2 px-2"
           />
            <Link to="/admin/edit" state={{product}}>
                <span className='font-semibold text-slate-400 hover:underline '>
                      {product?.name}
                  </span>
            </Link>
     
    </td>  
    
 
      <td className='text-sm font-light text-slate-500'>{product?.category}</td>
      <td className='text-sm font-light text-slate-500'>${product?.price}</td>
      <td className='text-sm font-light text-slate-500'>{product?.sku}</td>
      <td className='text-sm font-light text-slate-500'>{""}</td>
  
      <td className='text-xs font-semibold  px-2  rounded-lg  '>
             <span className='font-semibold text-slate-500 text-green-600 bg-green-300 px-4 py-1 rounded-sm'>
                  {product?.status}
              </span>
      </td>
    

 </tr>

    )
}