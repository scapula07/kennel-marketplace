import React,{useState,useEffect} from 'react'
import Select from 'react-select'
import { shippingApi } from '../../api/shipping'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { orderApi } from '../../api/order'


export default function Shipment({order,customer,currentUser,setTrigger}) {
      const [cities, setSelectedCity] = useState([]);
      const [carriers,setCarriers]=useState([])
      const [carrier,setCarrier]=useState()
      const [states, setSelectedState] = useState([]);
      const [state,selectState]=useState()
      const [city,selectCity]=useState()
      const [shipping,setShipping]=useState({weight:0,templateToken:""})
      const [isLoading,setLoading]=useState(false)
      
      const [rates,setRates]=useState([])
 
      const [rateProvider,setProvider]=useState({})

      useEffect(()=>{
        const getParcelTemplates=async()=>{
            try{
                const result =await shippingApi.fetchPercel()
                setCarriers(result)
             }catch(e){
                console.log(e)
             }

        }
        getParcelTemplates()
      },[])

      useEffect(() => {
        getCountries();
      }, []);
    
        useEffect(() => {
            getCities();
        }, [state]);
    
      async function getCountries() {
        await axios
          .post("https://countriesnow.space/api/v0.1/countries/states",{"country":"United States"})
          .then(async(response) => {
         
             setSelectedState(response?.data?.data?.states)


          });
      }

      async function getCities() {
        await axios
          .post("https://countriesnow.space/api/v0.1/countries/state/cities",
          {  country:"United States",
             state:state?.value
          }
          )
          .then(async(response) => {
             console.log(response?.data?.data,"data")
             setSelectedCity(response?.data?.data)


          });
      }
      console.log(order,"carii")

      const createShipment=async()=>{
          setLoading(true)
          try{
              const parcel=await shippingApi.createPercel(Number(shipping?.weight),shipping?.token,order?.creator)
              console.log(parcel,"ppp")
            
            const shipment= await shippingApi.createShipment(
                  {
                    "name":customer?.name,
                    "street1":order?.delivery?.address,
                    "city": order?.delivery?.city,
                    "state":order?.delivery?.state,
                    "zip": order?.delivery?.postalCode,
                    "country": "US",
                    "phone": "4151234507",
                    "email": customer?.email
                    },
                  {
                    "name":currentUser?.name,
                    "street1":shipping?.street,
                    "city": shipping?.city,
                    "state":shipping?.state,
                    "zip": shipping?.zip,
                    "country": "US",
                    "phone": "4151234567",
                    "email": currentUser?.email

                  },
                  parcel
              )
              console.log(shipment,"shhio")
              shipment?.object_id?.length>0 && await orderApi.updateOrderShipment(order,shipment?.object_id)
              shipment?.object_id?.length>0 && setLoading(false)
              setTrigger(false)
          }catch(e){
            setLoading(false)
            console.log(e)
          }
      }

      console.log(shipping,currentUser,"carii")

      const saveRate=async()=>{
             setLoading(true)
          try{
             rates?.length>0 && await orderApi.updateDeliveryRate(order,rateProvider)
             rates?.length>0 && setLoading(false)
             setTrigger(false)

            }catch(e){
               console.log(e)
               setLoading(false)
            }
      }
  return (
    <div className='w-full h-full overflow-y-scroll'>
          <div className='w-full border-b py-3 '>
               <h5 className='font-semibold text-lg'>New Shipment</h5>
               <p className='text-xs font-semibold'>Creating a shipment will help calculate shipping rate for this order</p>
          </div>

          <div className='flex flex-col w-full space-y-6 py-3'>
                   <div className='w-full flex flex-col'>
                       <h5 className='font-semibold'>Ship from</h5>
                        <div className='grid grid-flow-row grid-cols-2  gap-4 gap-y-8 py-4 '>
                                 <Select
                                     
                                     placeholder="Select state*"
                                     options={states?.length >0 &&
                                       states?.map((item, index) => ({
                                           label: item?.name,
                                           value: item?.name
                                         
                                       }))}
                                     value={state}
                                     noOptionsMessage={(opt) => {
                                       if (opt.inputValue === "") {
                                         return "Select your  State";
                                       } else {
                                         return "no search results for " + opt.inputValue;
                                       }
                                     }}
                                     components={{
                                       IndicatorSeparator: () => null,
                                     }}
                                     onChange={(opt) => {
                                       selectState(opt)
                                       setShipping({...shipping,state:opt?.value})
                                   
                                     }}
                                   />

                                      <Select
                                        placeholder="Select city*"
                                        options={cities?.length >0 &&
                                          cities?.slice(0,1100)?.map((item, index) => ({
                                              label: item,
                                              value: item
                                            
                                          }))}
                                        value={city}
                             
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
                                          setShipping({...shipping,city:opt?.value})
                                   
                                        }}
                                      />

                                              
                                    <input 
                                        placeholder='Enter your street address*'
                                        className='w-full border py-2 px-3 rounded-sm text-sm'
                                        onChange={(e) => {
                                          setShipping({...shipping,street:e.target?.value})
                                        
                                        }}
                                        />
                                            
                                    <input 
                                        placeholder='Enter your postal code/zip*'
                                        className='w-full border py-2 px-3 rounded-sm text-sm'
                                        onChange={(e) => {
                                          setShipping({...shipping,zip:e.target?.value})
                                        
                                        }}
                                        />
                              

                       </div>

                   </div>
                  <div className='w-full'>
                            <Select                  
                                placeholder="Select a carrier provider"
                                className='text-sm'
                                options={carriers?.length >0 &&
                                carriers?.map((item, index) => ({
                                    label:`${item?.carrier} ${item?.name} (${item?.width} x ${item?.height} ${item?.distance_unit})`,
                                    value:item?.token
                                    
                                }))}
                                value={carrier}
                                noOptionsMessage={(opt) => {
                                if (opt.inputValue === "") {
                                    return "Select a carrier";
                                } else {
                                    return "no search results for " + opt.inputValue;
                                }
                                }}
                                components={{
                                IndicatorSeparator: () => null,
                                }}
                                onChange={(opt) => {
                                    setCarrier(opt);
                                    setShipping({...shipping,token:opt?.value})
                        
                                }}
                            />
                        

                  </div>

                  <div className='flex flex-col space-y-2 border-b pb-8'>
                      <h5 className='text-sm font-semibold'>Package Weight (optional)</h5>
                      <input 
                         placeholder='Weight in kg'
                         className='border py-3 px-3 w-1/3 text-sm'
                         onChange={(e)=>setShipping({...shipping,weight:Number(e.target.value)})}
                      />
                      <h5 className='text-xs font-light text-slate-700 '>Includes packaging</h5>
                    
                  </div>

          </div>

          {order?.shipmentId?.length >0&&
               <Rates 
                    id={order?.shipmentId} 
                    rates={rates}
                    setRates={setRates}
                    rateProvider={rateProvider}
                    setProvider={setProvider}
                />
          }
          {rates?.length >0?
                    <div className='w-full flex justify-end'>
                    {isLoading?
                      <ClipLoader
                        size={12}
                        />
                        :
                      <button className='bg-orange-500 text-sm py-2 px-6' onClick={()=>saveRate()}>Save rate</button>
    
                     }
            
    
                  </div>
                     :
                  <div className='w-full flex justify-end'>
                   {isLoading?
                    <ClipLoader
                      size={12}
                      />
                    :
                    <button className='bg-orange-500 text-sm py-2 px-6' onClick={createShipment}>Create</button>
  
                   }
          
  
                </div>

          }
          


           

      


    </div>
    )
}



const Rates=({id,rates,setRates,rateProvider,setProvider})=>{

   const [rate,setRate]=useState({})


   console.log(id,"idddd")

  useEffect(()=>{
    const getShippingRate=async()=>{
        try{
            const result =await shippingApi.getShippingRates(id)
            console.log(result,"res")
            setRates(result?.results)
            setProvider(result?.results[0])
            setRate({
              label:`${result?.results[0]?.provider} - ${result?.results[0]?.amount} Dollars($)`,
              value:result?.results[0]
            })
         }catch(e){
            console.log(e)
         }

    }
 getShippingRate()
    
  },[id])

  console.log(rateProvider,"pp")

  return(
     <div className='w-full py-8 flex flex-col' >
          <div className='w-full flex flex-col space-y-2' >
                     <h5 className='text-xs font-semibold'>Select a rate from a carrier provider</h5>
                       <Select                  
                            placeholder="Select a carrier provider"
                            className='text-sm  text-black'
                            options={rates?.length >0 &&
                            rates?.map((item, index) => ({
                                label:`${item?.provider} - ${item?.amount} Dollars($)`,
                                value:item
                                
                            }))}
                            value={rate}
                            noOptionsMessage={(opt) => {
                            if (opt.inputValue === "") {
                                return "Select a rate";
                            } else {
                                return "no search results for " + opt.inputValue;
                            }
                            }}
                            components={{
                            IndicatorSeparator: () => null,
                            }}
                            onChange={(opt) => {
                              setRate(opt);
                                // setShipping({...shipping,token:opt?.value})
                                setProvider(opt?.value)
                            }}
                            />
              
          </div>

            <div className='flex py-2 items-center space-x-2'>
                <img 
                  src={rateProvider?.provider_image_200}
                  className="w-10 h-10"
                />
                <h5 className='text-sm font-semibold'>{rateProvider?.duration_terms}</h5>

            </div>

         

     </div>
  )
}