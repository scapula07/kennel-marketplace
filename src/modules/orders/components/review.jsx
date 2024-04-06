import React ,{useState} from 'react'
import { FaStar } from "react-icons/fa6";
import { productApi } from '../../api/product';
import { ClipLoader } from 'react-spinners';
import { accountTypeState } from '../../recoil/state';
import { useRecoilValue } from 'recoil';
export default function Review({product,setTrigger}) {
    console.log(product,"pppp review")
    const currentUser=useRecoilValue(accountTypeState)
    const [count,setCount]=useState(0)
    const [review,setReview]=useState({user:currentUser?.name})
    const [loading,setLoading]=useState(false)
   

    const addReview=async()=>{
             setLoading(true)
          try{
              const res=await productApi.addReviews(product,review)
              setLoading(false)
              setTrigger(false)
          }catch(e){
            setLoading(false)
            console.log(e)
          }
         
    }
    console.log(review,"rrrrr")
  return (
    <div className='w-full flex flex-col space-y-4'>
         <h5 className='text-xl font-semibold text-slate-700'>Rate & Review</h5>
         <div className='flex flex-col space-y-4'>
             <h5 className='text-lg font-light'>SELECT THE STARS TO RATE THE PRODUCT</h5>

                  <div className='flex space-x-4 '>
                            <img 
                              src={product?.images[0]}
                                className="w-44 h-44 rounded-lg"
                            />
                            <div className='flex flex-col space-y-2'>
                                <h5 className='text-lg font-light'>{product?.name}</h5>
                                <div className='flex space-x-3'>
                                    {[<FaStar />,<FaStar />,<FaStar />,<FaStar />,<FaStar />]?.map((icon)=>{
                                      return(
                                        <Star 
                                          icon={icon}
                                          setCount={setCount}
                                          count={count}
                                          review={review}
                                          setReview={setReview}
                                        />
                                      )
                                    })

                                    }

                                    <h5 className='text-sm font-light'>{count==1&&"I hate it" }</h5>
                                    <h5 className='text-sm font-light'>{count==2&&"I dont like it" }</h5>
                                    <h5 className='text-sm font-light'>{count==3&&"I have missed feelings" }</h5>
                                    <h5 className='text-sm font-light'>{count==4&&"I like it" }</h5>
                                    <h5 className='text-sm font-light'>{count==5&&"I love it!" }</h5>

                                </div>

                    </div>

               
                

             </div>

             <div className='flex flex-col space-y-8'> 
                           <h5>LEAVE A REVIEW</h5>
                           <div className='flex flex-col space-y-2 w-full'>
                                
                                  <textarea 
                                    placeholder='Tell us more about your ratings'
                                    className='w-full px-4 py-2 text-sm h-28  rounded-lg border'
                                    value={review?.text}
                                    onChange={(e)=>setReview({...review,text:e.target.value})}
                                  />

                           </div>
                           <button className='w-full bg-orange-600 text-white font-semibold py-2 rounded-sm text-center'
                               onClick={()=>!loading&&addReview()}
                           >
                              {!loading?
                               "Submit"
                                 :
                                 <ClipLoader size={12} color="white" />

                             }
                         
                           
                           </button>

                    </div>

         </div>
        

    </div>
  )
}



const Star=({icon,count,setCount,review,setReview})=>{
      const [click,setClick]=useState(false)
      const tapIn=()=>{
         setClick(false) 
        
         setReview({...review,rating:count-1})
         setCount(count -1)
      }
      const tapOut=()=>{
        setClick(true)  

        setReview({...review,rating:count+1})
        setCount(count +1) 
      }
    return(
      <>
      { click?
         <h5 className='text-2xl text-yellow-400' onClick={()=>tapIn()}> {icon}</h5>
         :
       <h5 className='text-2xl text-slate-400' onClick={()=>tapOut()}>{icon}</h5>

      }
      </>
    
    )
}