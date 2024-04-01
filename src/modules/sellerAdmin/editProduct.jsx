import React ,{useState,useEffect} from 'react'
import { useLocation,useParams} from "react-router-dom";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot}  from "firebase/firestore";
import { db } from '../firebase';
import Select from "react-select";
import { productApi } from '../api/product';
import { BeatLoader } from 'react-spinners';


export default function EditProductSeller() {
  const [product,setProduct]=useState({images:[]})
  const location =useLocation()
  const [isLoading,setLoading]=useState(false)

  const item=location?.state.product



  useEffect(()=>{
    
      if(item?.id?.length != undefined){
        const unsub = onSnapshot(doc(db,"products",item?.id), (doc) => {
          console.log(doc.data(),"daa")
      
          setProduct({...doc.data(),id:doc?.id})
         });
        }
       },[])

       console.log(product,"prod")
       const edit=async()=>{
          setLoading(true)
          try{
            const res=await productApi.editProduct(product)
            setLoading(false)
          }catch(e){
            setLoading(false)
            console.log(e)
          }
       }
  return (
    <div className='w-full space-y-4 '>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Edit product</h5>
                </div>
                <div className='w-full text-white py-6 px-4 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-2xl font-semibold text-white'>Make the changes below</h5>
                              {isLoading?
                                <button className='bg-white rounded-lg px-6 py-2 text-black text-sm font-semibold' >
                                   <BeatLoader size={"8"}/>
                                </button>
                                :
                                <button className='bg-white rounded-lg px-6 py-2 text-black text-sm font-semibold' onClick={edit}>Save</button>

                              }
                  
                        </div>



                        <div className='w-full flex space-x-4 pb-8'>
                              <div className='bg-white w-2/5 h-72 rounded-xl flex flex-col px-4 py-6 space-y-4'>
                                    <h5 className='text-xl font-semibold text-slate-700 '>Product Image</h5>
                                    <div className='grid grid-flow-row grid-cols-3 gap-3'>
                                      {product?.images?.map((url)=>{
                                         return(
                                          <img 
                                              src={url}
                                              className="h-28 rounded-lg"
                                          />
                                         )
                                      })

                                      }

                                    </div>

                                    <div className='flex items-center space-x-3'>
                                          <button className='bg-orange-500 text-white rounded-lg px-6 py-2 text-sm'>Edit</button>
                                          <button className='border border-orange-500 rounded-lg px-6 py-2 text-black text-sm '>Remove</button>

                                    </div>

                              </div>


                              <div className='flex flex-col w-3/5 space-y-4'>
                                         <div className='bg-white w-full  rounded-xl flex flex-col px-4 py-6 space-y-4'>
                                                   <h5 className='text-xl font-semibold text-slate-700 '>Product Information</h5>
                                                   <div className='flex w-full'>
                                                         <div className='w-1/2'>
                                                             <Info 
                                                               product={product}
                                                               setProduct={setProduct}
                                                             />

                                                         </div>

                                                         <div className='w-1/2 flex flex-col space-y-3'>
                                                         <div className='flex flex-col space-y-2'>
                                                                <label className='text-sm font-semibold text-black'>Weight</label>
                                                                     <input 
                                                                        placeholder='e.g 42'
                                                                        className='rounded-lg px-4 py-3 border text-sm text-black'
                                                                        value={product?.weight}
                                                                        onChange={(e)=>setProduct({...product,weight:e.target.value})}
                                                                        />

                                                                </div>
                                                            {[
                                                              
                                                                {
                                                                    title:"Category",
                                                                    items:["Dogs","Cats"],
                                                                    click:(e)=>setProduct({...product,category:e.target.value})

                                                                },
                                                                {
                                                                    title:"Sizes",
                                                                    items:["10","20"],
                                                                    click:(e)=>setProduct({...product,sizes:e.target.value})

                                                                }

                                                            ]?.map((item)=>{
                                                                  return(
                                                                    <div className='flex flex-col space-y-2'>
                                                                    <label className='text-sm font-semibold text-black'>{item?.title}</label>
                                                                    <select 
                                                                      placeholder='e.g Dogs feed'
                                                                      className='rounded-lg px-4 py-3 border text-sm outline-none text-black'
                                                                      onChange={(e)=>item?.click(e)}
                                                                    >
                                                                        {item?.items?.map((tag)=>{
                                                                            return(
                                                                                <option value={tag}>{tag}</option>
                                                                            )
                                                                        })

                                                                        }
                                                                      
                                                                      </select>

                                                                </div>
                                                                  )
                                                            })

                                                            }
                            
                                                      

                                                         </div>


                                                   </div>

                                            </div>

                                            <div className='bg-white w-full  rounded-xl flex flex-col px-4 py-6 space-y-4'>
                                                   <h5 className='text-xl font-semibold text-slate-700 '>Pricing</h5>
                                            <Pricing 
                                                   product={product}
                                                   setProduct={setProduct}
                                            />

                                            </div>

                              </div>


                        </div>

                  </div>

        
    </div>
  )
}





const Info=({setProduct,product})=>{
  return(
     <div className='bg-white rounded-lg flex flex-col w-full  px-2'>
            <div className='flex w-full space-x-4'>
                    <div className='w-full flex flex-col space-y-4 '>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-sm font-semibold text-black'>Name</label>
                                <input 
                                   placeholder='e.g Dogs feed'
                                   type={"text"}
                                   className='rounded-lg px-4 py-3 border text-sm text-black'
                                   value={product?.name}
                                   onChange={(e)=>setProduct({...product,name:e.target.value})}
                                />

                            </div>

                            <div className='flex flex-col space-y-2 text-black'>
                                <label className='text-sm font-semibold'>Description</label>
                                <textarea 
                                   placeholder='Product description'
                                   className='rounded-lg px-4 py-3 border text-sm h-28'
                                   value={product?.description}
                                   onChange={(e)=>setProduct({...product,description:e.target.value})}
                                />

                            </div>


                    </div>


                    
                  

            </div>

           
     </div>
  )
}















const Pricing=({setProduct,product})=>{
  const options = [
      { value: 'instock', label: 'In stock' },
      { value: 'outstock', label: 'Out stock' },

    ]
  return(
     <div className='bg-white rounded-lg flex flex-col w-full  px-6 space-y-6'>
           <div className='flex space-x-3'>
                   <div className='flex flex-col space-y-2 w-1/3'>
                                  <label className='text-sm font-semibold'>Price</label>
                                  <input 
                                     placeholder='1'
                                     type={"number"}
                                     className='rounded-lg px-4 py-2 border text-sm text-black'
                                     value={product?.price}
                                     onChange={(e)=>setProduct({...product,price:e.target.value})}
                                  />

                      </div>

                      <div className='flex flex-col space-y-2 w-1/3'>
                                  <label className='text-sm font-semibold'>Currency</label>
                                  <select 
                                 
                                     className='rounded-lg px-4 py-2 border text-sm outline-none text-black'
                                     onChange={(e)=>setProduct({...product,currency:e.target.value})}
                                  >
                                      {["USD","GBP"].map((tag)=>{
                                           return(
                                              <option value={tag}>{tag}</option>
                                           )
                                      })

                                      }
                                     
                                    </select>

                      </div>


                      <div className='flex flex-col space-y-2 w-1/3'>
                                  <label className='text-sm font-semibold'>SKU</label>
                                  <input 
                                     placeholder='1ABC5689'
                                     className='rounded-lg px-4 py-2 border text-sm text-black'
                                     value={product?.sku}
                                     onChange={(e)=>setProduct({...product,sku:e.target.value})}
                                  />

                      </div>

           </div>

           <div className='flex flex-col w-full space-y-3'>
                 <h5 className='text-sm font-semibold'>Tags</h5>
                  <Select
                      defaultValue={[options[0],options[1]]}
                      name="colors"
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={product?.status}
                      onChange={(opt)=>setProduct({...product,status:opt?.value})}
                  />
           </div>



     </div>
  )
}



