import React from 'react'
import { useState,useRef } from 'react'
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { IoMdClose } from "react-icons/io";
import { serviceApi } from '../api/service';
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AddService() {
      const navigate=useNavigate()
      const [num,setNum]=useState(1)
      const currentUser=useRecoilValue(accountTypeState)
      const [product,setProduct]=useState({name:"",description:"",qty:1,currency:"USD",category:[],features:[],sku:"",price:0,calendly:""})
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
     
          if (product?.category.length == 0) {
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
          if (product?.calendly.length == 0) {
            setErrorMsg( "Your booking link is missing" );
            setLoading(false);
            setNum(3)
            return;
          }
         try{
             const res=await serviceApi.create(product,currentUser,files)
              res&&setLoading(false)
              navigate("/admin-seller/services");
          }catch(e){
            console.log(e)
            setLoading(false)
            setErrorMsg(' Something went wrong! ');
          }
      }

      

   console.log(product,"pppr")

  return (
    <div className='w-full'>
          <div className='flex flex-col space-y-3'>
            <h5 className='text-black font-light text-sm'>Breeder/Service</h5>
            
            <h5 className='text-lg font-semibold text-black'>New Service</h5>

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
               <h5 className='text-lg font-semibold'>Service Information</h5>
                <div className='flex w-full space-x-4'>
                        <div className='w-1/2 flex flex-col space-y-8 '>
                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Name</label>
                                    <input 
                                       placeholder='e.g Full check up'
                                       className='rounded-sm  px-4 py-3 border text-sm'
                                       value={product?.name}
                                       onChange={(e)=>setProduct({...product,name:e.target.value})}
                                    />

                                </div>

                                <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>Description</label>
                                    <textarea 
                                       placeholder='Service description'
                                       className='rounded-sm px-4 py-3 border text-sm h-28'
                                       value={product?.description}
                                       onChange={(e)=>setProduct({...product,description:e.target.value})}
                                    />

                                </div>

                                <div className='flex flex-col space-y-3'>
                                    <label className='text-sm font-semibold'>Top  domestic animal services</label>
                                    <CreatableSelect 
                                       isMulti 
                                       options={features}
                                          value={product?.features}
                                          onChange={(opt) => {
                                          console.log(opt,"opt")
                                           setProduct({...product,features:opt})
                                       }}
                                     />
                                     <h5 className='text-slate-700 text-sm'>These are the top supported services on Kennel Breeder.You can create a service you like to offer.</h5>
                                </div>


                        </div>


                        <div className='w-1/2 flex flex-col space-y-4'> 
                            {[
                               
                                 {
                                    title:"Categories",
                                    items:items,
                                    value:product?.category,
                              
                                    click:(opt)=>setProduct({...product,category:opt})

                                  },
                         

                             ]?.map((item)=>{
                                  return(
                                    <div className='flex flex-col space-y-2'>
                                    <label className='text-sm font-semibold'>{item?.title}</label>
                              
                                        <Select
                                            defaultValue={[item?.items[2], item?.items[3]]}
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
             <h5 className='text-lg font-semibold'>Images</h5>


              <div className='flex w-full space-x-4'>
                      <div className='flex flex-col w-full space-y-3'>
                             
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
                   <button className='bg-orange-600 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num - 1)}>Back</button>
                 
                    <button className='bg-slate-800 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num + 1)}>Next</button>
                    

               </div>

       </div>
    )
}










const Pricing=({num,setNum,setProduct,product,isLoading,create})=>{
    const options = [
        { value: 'available', label: 'Available' },
        { value: 'unavailable', label: 'Unavailable' },

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


             </div>

      

                <div className='flex flex-col w-full space-y-3'>
                     
                     <input 
                    
                         className="border py-3 w-1/3 outline-none px-4 text-xs font-semibold"
                         placeholder='Your calendly booking link'
                         onChange={(e)=>setProduct({...product,calendly:e.target.value})}
                       />
                        <h5 className='text-xs font-semibold text-slate-600'>We prefer you create a Calendly scheduler for your available days</h5>
                   </div>




         

              <div className='flex w-full justify-between'>
                   <button className='bg-orange-600 text-white rounded-sm py-2 px-4 text-sm' onClick={()=>setNum(num - 1)}>Back</button>
                     {isLoading?
                      <ClipLoader
                        color={"black"}
                        size="14"
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





const features = [
  { label: "Dog Walking", value: "Dog Walking" },
  { label: "Pet Sitting", value: "Pet Sitting" },
  { label: "House Sitting for Pets", value: "House Sitting for Pets" },
  { label: "Dog Boarding", value: "Dog Boarding" },
  { label: "Cat Boarding", value: "Cat Boarding" },
  { label: "Small Animal Boarding", value: "Small Animal Boarding" },
  { label: "Horse/Livestock Boarding", value: "Horse/Livestock Boarding" },
  { label: "Pet Grooming", value: "Pet Grooming" },
  { label: "Mobile Pet Grooming", value: "Mobile Pet Grooming" },
  { label: "Dog Training", value: "Dog Training" },
  { label: "Cat Training", value: "Cat Training" },
  { label: "Horse Training", value: "Horse Training" },
  { label: "Pet Photography", value: "Pet Photography" },
  { label: "Pet Portraiture", value: "Pet Portraiture" },
  { label: "Pet Clothing/Accessories Design and Sales", value: "Pet Clothing/Accessories Design and Sales" },
  { label: "Pet Toy Making and Sales", value: "Pet Toy Making and Sales" },
  { label: "Pet Bakery/Treats", value: "Pet Bakery/Treats" },
  { label: "Pet Massage Therapy", value: "Pet Massage Therapy" },
  { label: "Animal Nail Trimming", value: "Animal Nail Trimming" },
  { label: "Equine Massage Therapy", value: "Equine Massage Therapy" },
  { label: "Equine Farrier Services", value: "Equine Farrier Services" },
  { label: "Dog Bathing", value: "Dog Bathing" },
  { label: "Cat Grooming", value: "Cat Grooming" },
  { label: "Equine Grooming", value: "Equine Grooming" },
  { label: "Small Animal Grooming", value: "Small Animal Grooming" },
  { label: "Poop Scooping/Yard Clean-up", value: "Poop Scooping/Yard Clean-up" },
  { label: "Pet-Sitting/House-Sitting Booking Service", value: "Pet-Sitting/House-Sitting Booking Service" },
  { label: "Dog Walking Service", value: "Dog Walking Service" },
  { label: "Pet Taxi/Transportation", value: "Pet Taxi/Transportation" },
  { label: "Pet Waste Removal Service", value: "Pet Waste Removal Service" },
  { label: "Pet Concierge Services", value: "Pet Concierge Services" },
  { label: "Pet Apparel/Accessory Sales", value: "Pet Apparel/Accessory Sales" },
  { label: "Homemade Pet Food Delivery", value: "Homemade Pet Food Delivery" },
  { label: "Dog Daycare Services", value: "Dog Daycare Services" },
  { label: "Cat Hotel/Boarding Services", value: "Cat Hotel/Boarding Services" },
  { label: "Reptile/Exotic Pet Boarding", value: "Reptile/Exotic Pet Boarding" },
  { label: "Horse Training/Lessons", value: "Horse Training/Lessons" },
  { label: "Equine Boarding Facility Management", value: "Equine Boarding Facility Management" },
  { label: "Livestock Sitting/Chores", value: "Livestock Sitting/Chores" },
  { label: "Aquarium Maintenance", value: "Aquarium Maintenance" },
  { label: "Poultry/Livestock Sales", value: "Poultry/Livestock Sales" },
  { label: "Micro-Chipping Services", value: "Micro-Chipping Services" },
  { label: "Pet Hospice/End-of-Life Care", value: "Pet Hospice/End-of-Life Care" },
  { label: "Pet Bereavement Counseling", value: "Pet Bereavement Counseling" },
  { label: "Pet Loss Memorial Services", value: "Pet Loss Memorial Services" },
  { label: "Wildlife Rehabilitation Volunteer", value: "Wildlife Rehabilitation Volunteer" },
  { label: "Animal Rescue Foster Care", value: "Animal Rescue Foster Care" },
  { label: "Breed-Specific Rescue Coordination", value: "Breed-Specific Rescue Coordination" },
  { label: "Pet Sitting Network/Referrals", value: "Pet Sitting Network/Referrals" },
  { label: "Pet First Aid/CPR Training", value: "Pet First Aid/CPR Training" }
];
