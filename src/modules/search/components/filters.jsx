import React,{useState} from 'react'
import { FiSearch } from "react-icons/fi";
import { IoRadioButtonOffSharp } from "react-icons/io5";
import { IoRadioButtonOn } from "react-icons/io5";
import { ClipLoader } from 'react-spinners';

export default function Filters({filters,setFilter,apply,isLoading}) {
    
     const findPrice=async()=>{
        try{

        }catch(e){
          console.log(e)
        }
     }
    
 
  return (
    <div className='flex flex-col w-full'>
         <div className='flex items-center w-full justify-between'>
             <h5 className='text-lg '>Filters</h5>
             <h5 className='text-sm text-red-500 font-light flex items-center space-x-4'>
              {!isLoading? 
                   <span className='font-semibold text-orange-500 hover:underline' onClick={apply}> Apply</span>
                   :
                   <ClipLoader size={12} color={"orange"}/>


              }
             
              <span className=' text-red-500  ' onClick={()=>setFilter([])}> Clear all</span>
             
              </h5>
              
         </div>

         <div className='flex flex-col '>
             {[
                 {
                  label:"Categories",
                  items:["All","Products","Services","Animal breeding"]

                 },
                {
                    label:"Subcategories",
                    items:["Pet food","Toys","Pet health","Training","Beauty","Medicine","Sweets","Breeding kits"]
  
                  },
                  {
                    label:"Pets",
                    items:["Dog","Horse","Cow","Bull","Snake","Pig","Sheep"]
  
                  },
                  {
                    label:"Breeds",
                    items:["Alghan hound","Akita","Alaskan Malamute","America Bulldog"]
  
                  },
                  {
                    label:"Status",
                    items:["All","Akita","In stock","Upcoming","Out of stock","End soon"]
  
                  }
  
  
  

               ].map((filter)=>{
                 return(
                   <Card 
                     filter={filter}
                     filters={filters}
                     setFilter={setFilter}
                   />
                 )
            
              })}

         </div>

         <div className='flex flex-col w-full space-y-4 py-4'>
                 <h5 className='font-semibold'>
                    {"Price"}
                 </h5>
                 
                <div className='flex items-center w-3/4 justify-between space-x-8'>

                    <div className='flex flex-col w-1/3 space-y-1'>
                         <h5 className='text-slate-600'>From</h5>
                         <input 
                          className='border border-orange-700 rounded-lg py-2 px-2'
                          placeholder='500'
                         />

                    </div>
                    <div className='flex flex-col w-1/3 space-y-1'>
                         <h5 className='text-slate-600'>To</h5>
                         <input 
                          className='border border-orange-700 rounded-lg py-2 px-2'
                          placeholder='100000'
                         />

                    </div>

                </div>

         </div>

    </div>
  )
}


const Card=({filter,filters,setFilter})=>{
     
      return(
        <div className='border-t border-b flex flex-col py-4 space-y-3'>
             <h5 className='font-semibold'>{filter?.label}</h5>
             {filter?.label=="Breeds"&&
                <div className='border py-2 px-3 rounded-lg flex w-full justify-between'>
                        <input
                        placeholder='Search'
                        className='outline-none border-0 w-3/5'
                        />
                        <FiSearch
                        className='text-slate-600'
                        />

                </div>

             }
             <div className='flex flex-col space-y-3 overflow-y-scroll h-36'>
                {filter?.items.map((item,index)=>{
                   return(
                    
                     <Item 
                       item={item}
                       filters={filters}
                       setFilter={setFilter}
                       index={index}
                     />
                      

                     )
                })

                }
             </div>

        </div>
      )
}


const Item=({item,filters,setFilter,index})=>{
  const [onRadio,setRadio]=useState()
  const remove=()=>{
    
    const newFilters=[...filters]
 
    newFilters.splice(index, 1);
    setFilter(newFilters)


  }
  console.log(filters,"filters")
   return(
    <div className='flex items-center space-x-2'>
    {!onRadio?
     <IoRadioButtonOffSharp 
        onClick={()=>setRadio(true) || setFilter(prev=>[...prev,{label:item,value:item}])}
        className="text-orange-400"
      />
      :
      <IoRadioButtonOn 
          onClick={()=>setRadio(false) ||remove()}
          className="text-orange-400"
      />
       }
    <h5 className='font-light text-sm text-slate-600'>{item}</h5>


</div>

   )
}