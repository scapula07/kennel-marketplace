import React ,{useState,useEffect} from 'react'
import { FiSearch } from "react-icons/fi";
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../recoil/state';
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,onSnapshot,where,orderBy}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { Link } from 'react-router-dom';

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];





export default function ProductList() {

        const [products,setProducts]=useState([])
        

        useEffect(()=>{
        
            const q = query(collection(db, "products"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const products = []
                  querySnapshot.forEach((doc) => {
                    products.push({ ...doc.data(), id: doc.id })
        
                  });
        
        
               setProducts(products)
            });
        
        },[])
        console.log(products,"pp")
  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Admin/Products</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-4 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-xl font-semibold text-black'>All Products</h5>

                              <div className='flex items-center'>
                              <Link to="/admin/new-product" >
                              <button className='bg-orange-400 text-white rounded-lg py-2 px-4 text-sm'>+ New product</button>
                              </Link>


                              </div>

                        </div>

                        <div className='flex w-full justify-end'>
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
                        
                        {products?.map((product)=>{
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
  // const [customer,setCustomer]=useState({})
  // const [products,setProducts]=useState([])
 
  //   useEffect(()=>{
    
  //     if(order?.creator?.length != undefined){
  //       const unsub = onSnapshot(doc(db,"users",order?.creator), (doc) => {
  //         console.log(doc.data(),"daa")
      
  //         setCustomer({...doc.data(),id:doc?.id})
  //        });
  //       }
  //      },[])

      //  useEffect(()=>{
  
      //     if(order?.products?.length >0){
      //       const ids = order?.products?.map(obj => obj.id);
            
      //       const q = query(collection(db, "products"),where('id', 'in',ids ))
      //       const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //         const products= [];
      //         querySnapshot.forEach((doc) => {
      //           products.push({...doc?.data(),id:doc?.id});
               
      //         });
     
            
      //         setProducts(products)
      //       });

      //       }
      //    },[])
  

      //  console.log(order?.products,"prod")

      // const date = new Date(product?.time);

      // const day = date.getDate();
      // const month = date.getMonth() + 1; // Month is zero-based, so adding 1
      // const year= date.getFullYear()
      // const formattedDate = `${day},${monthNames[month]},${year}`;

      // console.log(formattedDate);

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