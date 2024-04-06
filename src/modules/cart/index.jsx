import React,{useState,useEffect} from 'react'
import Layout from '../../layout'
import { MdOutlineDeleteOutline } from "react-icons/md";
import prod from "../../assets/prod.png"
import { Link, useLocation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import { BsDash } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import { productApi } from '../api/product';
import { accountTypeState } from '../recoil/state';
import { useRecoilValue } from 'recoil';
export default function Cart() {
      useEffect(() => {
          
        window.scrollTo(0, 0);

      
    }, []);
        const location =useLocation()
       const products=location?.state?.products

        const [cart,setCart]=useState(products)
    
       const [total,setTotal]=useState(0)

       const currentUser=useRecoilValue(accountTypeState)

   

       console.log(cart,"prodyct ")
       function calculateTotalPrice(products) {
        let totalPrice = 0;
  
        products.forEach(product => {
          const subtotal = parseFloat(product.price) * product.qty; 
          totalPrice += subtotal; 
        });
      
        return totalPrice.toFixed(2); 
      }

      useEffect(()=>{
        const totalPrice = calculateTotalPrice(cart);
         setTotal(totalPrice)
      },[])
  return (
    <Layout>
        <div className='w-full h-full flex justify-center py-10'>
                <div className='flex flex-col w-3/4 space-y-10'> 
                        <div className='flex w-full justify-between '>
                            <h5 className='text-4xl font-semibold '>My cart</h5>
                       </div>


                       <div className='flex flex-col space-y-4 w-full '>
                                 <div className='py-4 '>
                                    <h5 className='text-lg font-light text-blue-600'>You have {cart?.length} items in your cart</h5>

                                 </div>

    

                     <div className='flex flex-col space-y-4'>


                          {cart?.map((product,index)=>{
                              return(
                                 <Card 
                                   item={product}
                                   setTotal={setTotal}
                                   total={total}
                                   currentUser={currentUser}
                                   setCart={setCart}
                                   cart={cart}
                                   index={index}
                                   
                                 />
                              )
                           })

                          }
                    {cart?.length >0&&
                    <div className='flex w-3/5 justify-end'>
                             <div className='flex items-center space-x-4'>
                                 <h5>Total:${total}</h5>
                                 <Link to="/checkout"
                                    state={{
                                      products,
                                      total:total
                                      }}
                                 >
                               
                                      <button className='bg-orange-600 py-3 px-6 rounded-lg text-white' >Checkout</button>
                                 </Link>

                             </div>

                       </div>
                          }
                       </div>


 
                     </div>
                    
                </div>


            </div>

    </Layout>

  )
}





const Card=({item,setTotal,total,currentUser,setCart,cart,index})=>{
     const [product,setProduct]=useState({images:[]})
     const [qty,setQty]=useState(1)
     const [isLoading,setLoading]=useState(false)
     useEffect(()=>{
      
      if(item?.id?.length != undefined){
        const unsub = onSnapshot(doc(db,"products",item?.id), (doc) => {
          console.log(doc.data(),"daa")
      
          setProduct({...doc.data(),id:doc?.id})
        
         });
        }
       },[qty])

       function calculateTotalPrice(products) {
        return products.reduce((total, product) => {
          return total + (parseFloat(product.price) * product.qty);
        }, 0);
      }
      

       console.log(product,"prod")

       const remove=async()=>{
        setLoading(true)
           try{

            const res=await productApi.removeFromCart(item,currentUser)
            setCart(res)
            setLoading(false)

           }catch(e){
            console.log(e)
            setLoading(false)
           }
       }

       const increment=()=>{
        setQty(qty+1)
        cart[index].qty += 1;
        const totalPrice = calculateTotalPrice(cart);
        setTotal(totalPrice)


       }

       const decrement=()=>{
        setQty(qty-1)
        cart[index].qty -= 1;
        const totalPrice = calculateTotalPrice(cart);
        setTotal(totalPrice)


       }
   return(
    <div className='flex w-3/5 bg-white rounded-lg px-4 space-x-6 h-28 py-4 px-4 shadow'>
    <img 
      src={product?.images[0]}
      className="w-20 h-20"
    />

    <div className='flex w-full items-center justify-between'>
        <div className='flex flex-col'>
              <div className='flex flex-col space-y-3'>
                   <h5 className='text-lg text-slate-700 font-light'>{product?.name}</h5>
                   <h5 className='text-sm text-slate-500 '>{product?.description?.slice(0,30)}...</h5>
              </div>

              <div className='flex items-center'>
              </div>
        </div>
      

         <div className='flex items-center w-1/4'>
               <div className='flex items-center space-x-5'>
                     <BsDash
                        className='text-3xl font-semibold text-slate-600'
                        onClick={()=>qty !=1&&decrement()}
                      />
                      <input 
                         className='h-10 w-10 rounded-lg border px-3 text-center'
                         value={qty}
                     />
                     <IoMdAdd
                         className='text-3xl font-semibold text-slate-600'
                         onClick={increment}

                      />

               </div>
         </div>
         <div className='flex space-x-3'>
             <h5 className='font-semibold'>${product?.price}</h5>
            <>
               {isLoading?


                      <ClipLoader 
                        color='orange'
                      />
                      :

                      <MdOutlineDeleteOutline 
                      className='text-slate-500 text-2xl'
                      onClick={remove}
                      />


                      }
          
             </>
            
            
            
          

         </div>
       

    </div>
   
 
</div>

   )
}