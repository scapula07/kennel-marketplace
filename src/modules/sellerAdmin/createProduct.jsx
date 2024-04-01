import React from 'react'
import { useState,useRef } from 'react'
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import { productApi } from '../api/product';
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function CreateProductSeller() {
      const navigate=useNavigate()
      const [num,setNum]=useState(1)
      const currentUser=useRecoilValue(accountTypeState)
      const [product,setProduct]=useState({})
      const [url,setUrl]=useState([])
      const [files,setFiles]=useState([])
      const [isLoading,setLoading]=useState(false)
      console.log(product,"prodcuct")


      const create=async()=>{
          setLoading(true)
         try{
             const res=await productApi.create(product,currentUser,files)
              res&&setLoading(false)
              navigate("/admin-seller/product", { state:res?.id});
          }catch(e){
            console.log(e)
            setLoading(false)
          }
      }

      

   

  return (
    <div className='w-full'>
          <div className='flex flex-col space-y-3'>
            <h5 className='text-white font-light text-sm'>Admin/Product</h5>
            
            <h5 className='text-lg font-semibold text-white'>New Product</h5>

          </div>


          <div className='py-20 flex justify-center'>
                <div className='w-3/4 flex flex-col  px-4 py-4'>
                        <div className='flex items-center'>
                              

                        </div>

                      {num==1&&
                          <Info
                          num={num}
                          setNum={setNum}
                          setProduct={setProduct}
                          product={product}
                         />

                      }

                     {num==2&&
                         <Media
                          num={num}
                          setNum={setNum}
                          setProduct={setProduct}
                          product={product}
                          url={url}
                          setUrl={setUrl}
                          files={files}
                          setFiles={setFiles}
                         />

                      }

                     {num==3&&
                         <Pricing
                          num={num}
                          setNum={setNum}
                          setProduct={setProduct}
                          product={product}
                          isLoading={isLoading}
                          create={create}
                        
                         />

                      }
                      
                      

                </div>
             

          </div>
      

    </div>
  )
}






const Info=({num,setNum,setProduct,product})=>{
      return(
         <div className='bg-slate-100 rounded-lg flex flex-col w-full py-6 px-6 space-y-6'>
               <h5 className='text-lg font-semibold'>Product Information</h5>
                <div className='flex w-full space-x-4'>
                        <div className='w-1/2 flex flex-col space-y-8 '>
                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Name</label>
                                    <input 
                                       placeholder='e.g Dogs feed'
                                       className='rounded-lg px-4 py-3 border text-sm'
                                       value={product?.name}
                                       onChange={(e)=>setProduct({...product,name:e.target.value})}
                                    />

                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Description</label>
                                    <textarea 
                                       placeholder='Product description'
                                       className='rounded-lg px-4 py-3 border text-sm h-28'
                                       value={product?.description}
                                       onChange={(e)=>setProduct({...product,description:e.target.value})}
                                    />

                                </div>


                        </div>


                        <div className='w-1/2 flex flex-col space-y-4'> 

                             <div className='flex flex-col space-y-2'>
                                <label className='text-sm font-semibold'>Weight</label>
                                        <input 
                                        placeholder='e.g 42'
                                        className='rounded-lg px-4 py-3 border text-sm'
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
                                    <label className='text-sm font-semibold'>{item?.title}</label>
                                    <select 
                                       placeholder='e.g Dogs feed'
                                       className='rounded-lg px-4 py-3 border text-sm outline-none'
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

                <div className='flex w-full justify-end'>
                      <button className='bg-slate-800 text-white rounded-lg py-2 px-4 text-sm' onClick={()=>setNum(num + 1)}>Next</button>
                      

                 </div>

         </div>
      )
}







const Media=({num,setNum,setProduct,product,url,setUrl,files,setFiles})=>{
        const hiddenFileInput = useRef()
     
        const handleClick = event => {
                hiddenFileInput.current.click()
            }


    const handleChange = async(e)=> {
        const dir = e.target.files[0]
        console.log(dir,"dir")
        if (dir) {
          setUrl(prev=>[...prev,{
              src: URL.createObjectURL(dir)
            }])
     

         }
         setFiles(prev=>[...prev,dir])
       

    }

    console.log(files,"media")
    return(
       <div className='bg-slate-100 rounded-lg flex flex-col w-full py-6 px-6 space-y-6'>
             <h5 className='text-lg font-semibold'>Media</h5>


              <div className='flex w-full space-x-4'>
                      <div className='flex flex-col w-full space-y-3'>
                                <h5>Product images</h5>
                                {url?.length ==0?
                                   <div className='flex w-full justify-center items-center h-36 rounded-xl border'>
                                         <h5 className='text-sm font-light text-slate-500 hover:underline'   onClick={handleClick}>Click to upload images</h5>
    
                                         <input
                                          type="file"
                                          className='hidden'
                                          ref={hiddenFileInput}
                                           onChange={handleChange}
                                         />
    
                                    </div>
                                    :
                                    <div className='flex flex-col w-full space-y-2  h-36 rounded-xl border py-4 px-6'>
                                       <h5 className='text-sm font-light text-slate-500 hover:underline text-center'   onClick={handleClick}>Click to upload images</h5>
                                         <div className='flex items-center space-x-4'>
                                              {url?.map((item)=>{
                                                  return(
                                                    <Image 
                                                       src={item?.src}
                                                    />
                                                  )
                                              })

                                              }


                                         </div>

                                    <input
                                     type="file"
                                     className='hidden'
                                     ref={hiddenFileInput}
                                      onChange={handleChange}
                                    />

                               </div>

                                }
                           



                           </div>


              </div>

              <div className='flex w-full justify-between'>
                   <button className='bg-orange-300 text-white rounded-lg py-2 px-4 text-sm' onClick={()=>setNum(num - 1)}>Back</button>
                 
                    <button className='bg-slate-800 text-white rounded-lg py-2 px-4 text-sm' onClick={()=>setNum(num + 1)}>Next</button>
                    

               </div>

       </div>
    )
}










const Pricing=({num,setNum,setProduct,product,isLoading,create})=>{
    const options = [
        { value: 'instock', label: 'In stock' },
        { value: 'outstock', label: 'Out stock' },

      ]
    return(
       <div className='bg-slate-100 rounded-lg flex flex-col w-full py-6 px-6 space-y-6'>
             <h5 className='text-lg font-semibold'>Pricing</h5>


             <div className='flex space-x-3'>
                     <div className='flex flex-col space-y-2 w-1/3'>
                                    <label className='text-sm font-semibold'>Price</label>
                                    <input 
                                       placeholder='1'
                                       type={"number"}
                                       className='rounded-lg px-4 py-2 border text-sm'
                                       value={product?.price}
                                       onChange={(e)=>setProduct({...product,price:e.target.value})}
                                    />

                        </div>

                        <div className='flex flex-col space-y-2 w-1/3'>
                                    <label className='text-sm font-semibold'>Currency</label>
                                    <select 
                                   
                                       className='rounded-lg px-4 py-2 border text-sm outline-none'
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
                                       className='rounded-lg px-4 py-2 border text-sm'
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

              <div className='flex w-full justify-between'>
                   <button className='bg-orange-300 text-white rounded-lg py-2 px-4 text-sm' onClick={()=>setNum(num - 1)}>Back</button>
                     {isLoading?
                      <ClipLoader
                        color={"black"}
                      />
                      :

                       <button className='bg-slate-800 text-white rounded-lg py-2 px-4 text-sm' onClick={create}>Submit</button>

                   }
                    
                    

               </div>

       </div>
    )
}



const Image=({src})=>{
     return(
        <div className='w-20 h-20 relative rounded-lg'>
            <img 
              src={src}
              className="h-full w-full rounded-lg"
            />

            <div className='absolute top-0 w-full h-full flex items-center justify-center bg-black opacity-60 rounded-lg'>
                  <IoMdClose 
                      className="text-4xl text-white"
                      onClick={""}
                  />

            </div>
        </div>
     )
}