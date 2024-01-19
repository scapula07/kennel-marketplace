import React from 'react'
import { FiSearch } from "react-icons/fi";


export default function Filters() {
  return (
    <div className='flex flex-col w-full'>
         <div className='flex items-center w-full justify-between'>
             <h5 className='text-lg '>Filters</h5>
             <h5 className='text-sm text-red-500 font-light'>Clear all</h5>
              
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
                   />
                 )
            
              })}

         </div>

         <div className='flex flex-col w-full space-y-4 py-4'>
                 <h5 className='font-semibold'>{"Price"}</h5>
                 
                <div className='flex items-center w-full justify-between space-x-8'>

                    <div className='flex flex-col w-1/2 space-y-1'>
                         <h5 className='text-slate-600'>From</h5>
                         <input 
                          className='border border-orange-700 rounded-lg py-2 px-2'
                          placeholder='500'
                         />

                    </div>
                    <div className='flex flex-col w-1/2 space-y-1'>
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


const Card=({filter})=>{
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
                {filter?.items.map((item)=>{
                   return(
                     <div className='flex items-center space-x-2'>
                        <input
                         type={"radio"} 
                         className="border-2"
                        />
                        <h5 className='font-light text-sm text-slate-600'>{item}</h5>

                
                    </div>
                     
                      

                     )
                })

                }
             </div>

        </div>
      )
}