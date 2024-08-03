import React from 'react'
import { useState,useRef } from 'react'
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { IoMdClose } from "react-icons/io";
import { productApi } from '../api/product';
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Litter() {
      const navigate=useNavigate()
      const [num,setNum]=useState(1)
      const currentUser=useRecoilValue(accountTypeState)
      const [product,setProduct]=useState({
                                           name:"",
                                           description:"",
                                           qty:1,
                                           currency:"USD",
                                           categories:[],
                                           features:[],
                                           sku:"",
                                           price:0,
                                           status:{ value: 'pre-order', label: 'Pre-order'}
                                          })
      const [url,setUrl]=useState([])
      const [files,setFiles]=useState([])
      const [isLoading,setLoading]=useState(false)
      const [errorMsg, setErrorMsg] = useState(null)
      


      const create=async()=>{
          setLoading(true)
          setErrorMsg(null)
          if (product?.name?.length < 3) {
            setErrorMsg(' Product name is required! ');
            setLoading(false);
            setNum(1)
            return;
          }
    
          if (product?.description.length < 3) {
            setErrorMsg( "Product description is required!" );
            setLoading(false)
            setNum(1);
            return;
          }
     
     
          if (files?.length ==0) {
            setErrorMsg( "Images are required!" );
            setLoading(false);
            setNum(2)
            return;
          }
          if (product?.price == 0) {
            setErrorMsg( "Price is required!" );
            setLoading(false);
            setNum(3)
            return;
          }
          if (product?.sku.length < 3) {
            setErrorMsg( "Product SKU is required!" );
            setLoading(false);
            setNum(3)
            return;
          }
          if (product?.categories.length == 0) {
            setErrorMsg( "Select a category" );
            setLoading(false);
            setNum(1)
            return;
          }
          if (product?.features.length == 0) {
            setErrorMsg( "Select a feature" );
            setLoading(false);
            setNum(1)
            return;
          }
         try{
             const res=await productApi.create(product,currentUser,files)
              res&&setLoading(false)
              navigate("/admin-seller/product", { state:res?.id});
          }catch(e){
            console.log(e)
            setLoading(false)
            setErrorMsg(' Something went wrong! ');
          }
      }

      



  return (
    <div className='w-full'>
          <div className='flex flex-col space-y-3'>
            <h5 className='text-black font-light text-sm'>Breeder/Litter</h5>
            
            <h5 className='text-lg font-semibold text-black'>Upcoming Litter</h5>

          </div>


          <div className='py-20 flex justify-center'>
                <div className='w-3/4 flex flex-col  px-4 py-4 space-y-3'>
                    
                {errorMsg && (
                
                  <h5 className='text-xs text-center font-semibold text-red-500'>{errorMsg}</h5>
                 )}

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
         <div className='bg-white rounded-lg flex flex-col w-full py-6 px-6 space-y-6'>
               <h5 className='text-lg font-semibold'>Product Information</h5>
                <div className='flex w-full space-x-4'>
                        <div className='w-1/2 flex flex-col space-y-8 '>
                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Name</label>
                                    <input 
                                       placeholder='e.g Dogs feed'
                                       className='rounded-sm px-4 py-3 border text-sm'
                                       value={product?.name}
                                       onChange={(e)=>setProduct({...product,name:e.target.value})}
                                    />

                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Description</label>
                                    <textarea 
                                       placeholder='Product description'
                                       className='rounded-sm px-4 py-3 border text-sm h-28'
                                       value={product?.description}
                                       onChange={(e)=>setProduct({...product,description:e.target.value})}
                                    />

                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Specifications and Key features</label>
                                    <p className='text-xs font-light'>These are specifications that fit your product.Select or create a spec</p>
                                    <CreatableSelect 
                                       isMulti 
                                       options={features}
                                          value={product?.features}
                                          onChange={(opt) => {
                                          console.log(opt,"opt")
                                           setProduct({...product,features:opt})
                                       }}
                                     />
                                     
                                </div>


                        </div>


                        <div className='w-1/2 flex flex-col space-y-4'> 

                             <div className='flex flex-col space-y-2'>
                                <label className='text-sm font-semibold'>Net Weight in kg</label>
                                        <input 
                                        placeholder='e.g 0.8'
                                        className='rounded-sm px-4 py-3 border text-sm'
                                        value={product?.weight}
                                        onChange={(e)=>setProduct({...product,weight:e.target.value})}
                                        />

                                </div>
                            {[
                               
                                 {
                                    title:"Categories",
                                    items:items,
                                    value:product?.category,
                              
                                    click:(opt)=>setProduct({...product,categories:opt})

                                  },
                                {
                                    title:"Size Variants",
                                    value:product?.sizes,
                                    items:[
                                      {
                                        label:"Large(above 100g)",
                                        value:"50"
                                      },
                                      {
                                        label:"Medium(50 to 100)",
                                        value:"10"
                                      },
                                      {
                                        label:"Small(less than 50g)",
                                        value:"10"
                                      },

                                       ],
                                    click:(opt)=>setProduct({...product,sizes:opt})

                                }

                             ]?.map((item)=>{
                                  return(
                                    <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>{item?.title}</label>
                              
                                        <Select
                                            defaultValue={[item?.items[0], item?.items[1],item?.items[2]]}
                                            isMulti
                                            name="colors"
                                            options={item?.items}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            value={item?.value}
                                            onChange={(opt) => {
                                              item?.click(opt)
                                              console.log(opt,"opti")
                                              }}
                                          />

                                </div>
                                  )
                            })

                            }
                             <div className='flex flex-col space-y-2'>
                                <label className='text-sm font-semibold'>Quantity</label>
                                        <input 
                                        placeholder='1'
                                        className='rounded-sm px-4 py-3 border text-sm'
                                        value={product?.qty}
                                        type="number"
                                        onChange={(e)=>setProduct({...product,qty:e.target.value})}
                                        />

                                </div>
                        </div>
                      

                </div>

                <div className='flex w-full justify-end'>
                      <button className='bg-slate-800 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num + 1)}>Next</button>
                      

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
       <div className='bg-white rounded-lg flex flex-col w-full py-6 px-6 space-y-6'>
             <h5 className='text-lg font-semibold'>Media</h5>


              <div className='flex w-full space-x-4'>
                      <div className='flex flex-col w-full space-y-3'>
                                <h5>Product images</h5>
                                {url?.length ==0?
                                   <div className='flex w-full justify-center items-center h-36 rounded-sm border'>
                                         <h5 className='text-sm font-light text-slate-500 hover:underline'   onClick={handleClick}>Click to upload images</h5>
    
                                         <input
                                          type="file"
                                          className='hidden'
                                          ref={hiddenFileInput}
                                           onChange={handleChange}
                                         />
    
                                    </div>
                                    :
                                    <div className='flex flex-col w-full space-y-2  h-36 rounded-sm border py-4 px-6'>
                                       <h5 className='text-sm font-light text-slate-500 hover:underline text-center'   onClick={handleClick}>Click to upload images</h5>
                                         <div className='flex items-center space-x-4'>
                                              {url?.map((item,index)=>{
                                                  return(
                                                    <Image 
                                                       src={item?.src}
                                                       url={url}
                                                       setUrl={setUrl}
                                                       files={files}
                                                       setFiles={setFiles}
                                                       index={index}
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
                   <button className='bg-orange-300 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num - 1)}>Back</button>
                 
                    <button className='bg-slate-800 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num + 1)}>Next</button>
                    

               </div>

       </div>
    )
}










const Pricing=({num,setNum,setProduct,product,isLoading,create})=>{
    const options = [
     { value: 'preorder', label: 'Pre-order' },
     ]
    return(
       <div className='bg-white rounded-lg flex flex-col w-full py-6 px-6 space-y-6'>
             <h5 className='text-lg font-semibold'>Pricing</h5>


             <div className='flex space-x-3'>
                     <div className='flex flex-col space-y-2 w-1/3'>
                                    <label className='text-sm font-semibold'>Price</label>
                                    <input 
                                       placeholder='1'
                                       type={"number"}
                                       className='rounded-sm px-4 py-2 border text-sm'
                                       value={product?.price}
                                       onChange={(e)=>setProduct({...product,price:Number(e.target.value)})}
                                    />

                        </div>

                        <div className='flex flex-col space-y-2 w-1/3'>
                                    <label className='text-sm font-semibold'>Currency</label>
                                    <select 
                                   
                                       className='rounded-sm px-4 py-2 border text-sm outline-none'
                                       onChange={(e)=>setProduct({...product,currency:e.target.value})}
                                    >
                                        {["USD"].map((tag)=>{
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
                                       className='rounded-sm px-4 py-2 border text-sm'
                                       value={product?.sku}
                                       onChange={(e)=>setProduct({...product,sku:e.target.value})}
                                    />

                        </div>

             </div>

             <div className='flex flex-col w-full space-y-3'>
                   <h5 className='text-sm font-semibold'>Tags</h5>
                    <Select
                        defaultValue={options[0]}
                        name="colors"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={product?.status}
                        onChange={(opt)=>setProduct({...product,status:opt})}
                    />
             </div>

         
           

                <div className='flex flex-col w-full space-y-3'>
                     
                      <input 
                          type={"date"}
                          className="border-b py-3 w-1/3 outline-none px-4 text-xs font-semibold"
                          placeholder='Available in'
                          onChange={(e)=>setProduct({...product,availableDate:e.target.value})}
                        />
                         <h5 className='text-xs font-semibold text-slate-600'>Date for product availability</h5>
                </div>
               

         

              <div className='flex w-full justify-between'>
                   <button className='bg-orange-300 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num - 1)}>Back</button>
                     {isLoading?
                      <ClipLoader
                        color={"black"}
                        size="12"
                      />
                      :

                       <button className='bg-slate-800 text-white rounded-sm py-2 px-4 text-sm' onClick={create}>Submit</button>

                   }
                    
                    

               </div>

       </div>
    )
}



const Image=({src,url,setUrl,files,setFiles,index})=>{
        const remove=()=>{
          const newFiles=[...files]
          const newUrl=[...url]
          newFiles.splice(index, 1);
          
          newUrl.splice(index,1)

          
          setFiles(newFiles)
          setUrl(newUrl)

        }
     return(
        <div className='w-20 h-20 relative rounded-lg'>
            <img 
              src={src}
              className="h-full w-full rounded-lg"
            />

            <div className='absolute top-0 w-full h-full flex items-center justify-center bg-black opacity-60 rounded-lg'>
                  <IoMdClose 
                      className="text-4xl text-white"
                      onClick={remove}
                  />

            </div>
        </div>
     )
}
















const items=[
  {
    label:"Dogs",
    value:"Dogs"
  },
  {
    label:"Cats",
    value:"Cats"
  },
  {
    label:"Horse",
    value:"H0rse"
  },
  {
    label:"Cows",
    value:"Cows"
  },
  {
    label:"Cows",
    value:"Cows"
  },
  {
    label:"Snake",
    value:"Snake"
  },
  {
    label:"Pig",
    value:"Pig"
  },
  {
    label:"Breeding kits",
    value:"Breeding kits"
  },
  {
    label:"Training",
    value:"Training"
  },
  {
    label:"Medicine",
    value:"Medicine"
  },
 
]






const features=[
  {
    label:"Equine Artificial Insemination Kit",
    value:"Equine Artificial Insemination Kit"
  },
  {
    label:"Breeding Mount",
    value:"Breeding Mount"
  },
  {
    label:"Semen Collection Equipmen",
    value:"Semen Collection Equipmen"
  },
  {
    label:"Ultrasound Machine",
    value:"Ultrasound Machine"
  },
  {
    label:"Breeding Stocks",
    value:"Breeding Stocks"
  },
  {
    label:"Breeding Halter",
    value:"Breeding Halter"
  },
  {
    label:"Breeding Supplies",
    value:"Breeding Supplies"
  },
  {
    label:"Foaling Alarm System",
    value:"Foaling Alarm System"
  },
  {
    label:"Teasing Equipment",
    value:"Teasing Equipment"
  },
  {
    label:"Equine Breeding Management Software",
    value:"Equine Breeding Management Software"
  },
  {
    label:"Canine Artificial Insemination Kit",
    value:"Canine Artificial Insemination Kit"
  },
 
]