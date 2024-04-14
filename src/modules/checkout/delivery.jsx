import React,{useEffect,useState} from 'react'
import axios from "axios"
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from '../firebase';
import Select from 'react-select';
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoMdRadioButtonOn } from "react-icons/io";
import CreatableSelect from 'react-select/creatable';

export default function Delivery({delivery,setDelivery}) {
     const [cities, setSelectedCity] = useState();
     const [city,selectCity]=useState()
     const [radio,setRadio]=useState("FedEx Office")
     
     useEffect(() => {
          getCountries();
        }, []);
      
        async function getCountries() {
          await axios
            .get("https://countriesnow.space/api/v0.1/countries/")
            .then(async(response) => {
               console.log(response?.data?.data,"data")
                setSelectedCity(response?.data?.data[216]?.cities)


            });
        }


        console.log(delivery,"cityy")
    
  return (
    <div className='w-full flex flex-col space-y-5'>
           <div className='flex flex-col space-y-2'>
                <h5 className='text-slate-500 font-light '>Enter city name</h5>

                                 <CreatableSelect
                                        // styles={style}
                                        placeholder="Select your City, State"
                                        options={cities?.length >0 &&
                                          cities?.slice(0,500)?.map((item, index) => ({
                                              label: item,
                                              value: item
                                            
                                          }))}
                                        value={city}
                                        menuPlacement="auto"
                                        menuPosition="fixed"
                                        noOptionsMessage={(opt) => {
                                          if (opt.inputValue === "") {
                                            return "Select your City, State";
                                          } else {
                                            return "no search results for " + opt.inputValue;
                                          }
                                        }}
                                        components={{
                                          IndicatorSeparator: () => null,
                                        }}
                                        onChange={(opt) => {
                                          selectCity(opt);
                                          setDelivery({...delivery,city:opt?.value})
                                        }}
                                      />

                                    
                                         

           </div>


           <div className='bg-white px-6 py-4 w-full flex-col rounded-lg'>
                 <div className='flex flex-col space-y-1.5'>
                       <h5 className='text-slate-600'>Choose option</h5>

                        <div className='rounded-full border w-1/3 px-4 py-1 flex items-center space-x-3'> 
                           {radio==="FedEx Office"?
                              <IoMdRadioButtonOn 
                                className='text-blue-400'
                                
                              />
                              :
                              <IoMdRadioButtonOff 
                                 className='text-blue-400'
                                 onClick={()=>setRadio("FedEx Office") || setDelivery({...delivery,dispatch:"FedEx Office"})}
                              />
                           }

                            <h5 className='font-light text-slate-700 '>{"FedEx Office"}</h5>
                      </div>

                 </div>


                 <div className='flex flex-col space-y-2 py-4'>
                        <h5 className='text-slate-500 font-light '>Choose Office</h5>

                        <select className='bg-white rounded-lg border outline-none py-2 px-4 text-slate-500 font-light'>
                            <option>Delivery office</option>

                        </select>

                  </div>

                <div className='flex flex-col space-y-2.5 py-5'>
                     {["United States Postal Service","UPS (United Parcel Service)","Blue Dart Shipping","Directly from seller"].map((text)=>{
                          return(
                            <div className='rounded-full border w-1/2 px-4 py-1 flex items-center space-x-3'> 
                         {radio===text?
                              <IoMdRadioButtonOn 
                                className='text-blue-400'
                                
                              />
                              :
                              <IoMdRadioButtonOff 
                                 className='text-blue-400'
                                 onClick={()=>setRadio(text) || setDelivery({...delivery,dispatch:text})}
                              />
                           }

                            <h5 className='font-light text-slate-700 '>{text}</h5>
                         </div>
                          )
                     })

                     }
                
                </div>

           </div>

    </div>
  )
}
