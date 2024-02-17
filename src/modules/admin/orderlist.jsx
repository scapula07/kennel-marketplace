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
  "","January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];


export default function OrderList() {
  const [orders,setOrders]=useState([])
  const [areContacts,setContacts]=useState("")
  

useEffect(()=>{

    const q = query(collection(db, "orders"),orderBy('time', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const products = []
          querySnapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id })

          });
          products?.length===0 &&setContacts("No contact")
          products?.length >0 &&setContacts("")

     setOrders(products)
    });
 
},[])

console.log(orders,"orooo")
  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Admin/orders</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-4 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                            

                              <div className='flex items-center justify-end w-full'>
                                  <button className='bg-orange-400 text-white rounded-lg py-2 px-4 text-sm'>Filters</button>

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
                           orders={orders}
                        />

                      {orders?.length ===0&&areContacts?.length ==0&&
                                <div className='w-full flex justify-center py-5 '>
                                    <ClipLoader 
                                          color={"orange"}
                                          loading={true}
                                    />
                                </div>
                                }
                                            
                        {orders?.length ===0&&areContacts?.length >0&&
                        <div className='w-full flex justify-center  py-5'>
                        <h5 className="text-sm">No contacts</h5>
                        </div>
                        }

                </div>


              
    
    
    
    </div>
  )
}



const Table=({orders})=>{
      return(
        <div>
            <table class="table-auto w-full border-separate border-spacing-0.5">
                    <thead className='py-2'>
                    <tr >
                          {
                            ["ID",
                              "Date",
                            "Status",
                            "Customer",
                            "Products",
                            "Price",
                          

                            ].map((text)=>{
                                return(
                                <th className='py-1 text-xs text-slate-400 text-start'>{text}</th>
                            )
                            })
                        }
                             </tr>
                        
                    </thead>

                    <tbody className='w-full py-4'>
                        
                        {orders?.map((order,index)=>{
                             
                              return(
                              
                                  <Row 
                                     order={order}
                                  />
                                  

                              )
                          })

                        }
                     


                    </tbody>

     </table>

        </div>
      )
}


const Row=({order})=>{
  const [customer,setCustomer]=useState({})
  const [products,setProducts]=useState([])
 
    useEffect(()=>{
    
      if(order?.creator?.length != undefined){
        const unsub = onSnapshot(doc(db,"users",order?.creator), (doc) => {
          console.log(doc.data(),"daa")
      
          setCustomer({...doc.data(),id:doc?.id})
         });
        }
       },[])

       useEffect(()=>{
  
          if(order?.products?.length >0){
            const ids = order?.products?.map(obj => obj.id);
            
            const q = query(collection(db, "products"),where('id', 'in',ids ))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const products= [];
              querySnapshot.forEach((doc) => {
                products.push({...doc?.data(),id:doc?.id});
               
              });
     
            
              setProducts(products)
            });

            }
         },[])
  

       console.log(order?.products,"prod")

      const date = new Date(order?.time);

      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is zero-based, so adding 1
      const year= date.getFullYear()
      const formattedDate = `${day},${monthNames[month]},${year}`;

      console.log(formattedDate);

    return(
      <tr className='border-b '>
          <Link to="/admin/order" state={{order}}>
      <td className='flex items-center space-x-4'>
          <input
             type={"checkbox"}
             className="py-2 px-2"
           />
           <span className='text-sm font-light text-slate-500'>#{order?.id?.slice(0,4)}</span>

      </td>
      </Link>
      <td className='text-sm font-light text-slate-500'>{formattedDate}</td>
      <td className='text-sm font-light text-slate-500'>
       {order?.status=="active"?
          <span className='text-yellow-500'>{"Pending"}</span>
          :
          <span>{order?.status}</span>
       }
      </td>
      <td className='text-sm font-light text-slate-500 flex items-center space-x-1'>
        <span className='rounded-full bg-orange-400 text-white text-xs font-semibold h-4 w-4 flex items-center justify-center'>{customer?.name?.slice(0,1)}</span>
       <span> {customer?.name}</span>
        </td>
      <td className='text-sm font-light text-slate-500'>
            <select className='outline-none' >
                {products?.map((product)=>{
                    return(
                      <option>{product?.name}</option>
                    )
                })

                }
            </select>
      </td>
      <td className='text-sm font-light text-slate-500'>${order?.total}</td>
    

 </tr>

    )
}