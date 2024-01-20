import React from 'react'
import { MdOutlineStar } from "react-icons/md";
import { FiArrowRight } from 'react-icons/fi';
import breeder from "../../../assets/breeder.png"
import person from "../../../assets/person.png"
import cart from "../../../assets/cart.png"
import picture from "../../../assets/picture.png"
export default function Kennel() {
  return (
    <div className='w-4/6  py-20 flex flex-col '>


           <div className='flex w-full items-center justify-between' >

                  <div className='flex flex-col space-y-2'>
                      <h5 className='text-6xl font-semibold'>Kennel Breeders features</h5>
                      <h5 className='text-slate-500  '>Wondering why you should join Kennel Breeders? Here is our answer</h5>

                  </div>
             </div>


               <div  className='flex justify-between items-center py-10'>
                  {[
                    {
                      img:picture,
                      label:"Easily find what you need",
                      desc:"Our platform connects animal breeders with potential buyers, making it easy for both parties to find the perfect match."

                    },
                    {
                      img:person,
                      label:"Breeders, we got you covered",
                      desc:"With our intuitive user interface, breeders can create profiles and showcase their animals unique qualities and characteristics."

                    },
                    {
                      img:cart,
                      label:"Buyers, you will be satisfied",
                      desc:"Buyers can browse marketplace or breeders profiles and find animals, that meet their specific needs, whether it be for breeding or as a pet."

                    },

                    ].map((item)=>{
                      return(
                         <Card 
                           item={item}
                         />
                       )
                  })}


                </div>

              


    </div>
  )
}



const Card=({item})=>{
    return(
      <div className='flex flex-col w-full space-y-4'>
          <div className=' w-full flex flex-col items-center space-y-3'>
              <img 
                src={item?.img}
                className="rounded-full"
 
              />

          <div className='flex flex-col space-y-2 items-center'>
             <h5 className='text-slate-500 text-xl font-semibold'>{item?.label}</h5>
                <h5 className='text-slate-400 text-sm text-center '>{item?.desc}</h5>
            
 
           </div>
 
              

 
 
          </div>
 
          
         
      </div>
     )
 }
