import React,{useEffect,useState} from 'react'
import comb from "../../../assets/comb.png"
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegBookmark,FaRegStar,FaBookmark  } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { Link } from 'react-router-dom';
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc,startAt,endAt } from 'firebase/firestore'
 import { productApi } from '../../api/product';
import { ClipLoader } from 'react-spinners';
import { db } from '../../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../../recoil/state';
import ReactPaginate from 'react-paginate';
import { getAnalytics, logEvent } from "firebase/analytics";
import { IoTime } from "react-icons/io5";
import { convertToHumanReadableDate } from '../../util';

const analytics = getAnalytics();


export default function Products({products,setProducts}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 4
  const pageVisited = pageNumber * itemsPerPage



     
  useEffect(()=>{
    const q = query(collection(db, "products"),orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const products = []
        querySnapshot.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id })

        });


        setProducts(products)
   
      });
   },[])




   const currentItems = products?.slice(pageVisited, pageVisited + itemsPerPage)
   const pageCount = Math.ceil(products?.length / itemsPerPage)

   console.log(products,"producys")
   const handlePageClick = ({ selected }) => {
    setPageNumber(selected)
}



  return (
    <div className='w-full'>

         {products?.length===0&&

          <div className='flex w-full justify-center py-20'>
              <ClipLoader 
                 color='orange'
              />

          </div>
        }

           <div className='flex flex-col space-y-20 w-full'>
              
              <div  className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full py-6'>
                        {products?.length>0&&currentItems?.map((product)=>{
                            return(
                              <Card 
                                  product={product}
                              />
                            )
                        })}


                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={ handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="flex items-center space-x-4 justify-center w-full text-orange-500 "
                  />




              </div>
         

    </div>
  )
}





const Card=({product})=>{
  const currentUser=useRecoilValue(accountTypeState)
  const saved=useRecoilValue(saveTypeState)
         const [isLoading,setLoader]=useState(false)
         const [isSaving,setSave]=useState(false)

         const addTocart=async()=>{
            setLoader(true)
            try{
                const res=await productApi.addToCart(product,currentUser)
                logEvent(analytics, 'add_to_cart', {items:[{...product,affiliation:product?.creator,category:`${categories[0]}`}]});
                res&&setLoader(false)
              }catch(e){
              console.log(e)
              setLoader(false)
            }
         }

         const save=async()=>{
          setSave(true)
          try{
              const res=await productApi.save(product,currentUser)
              logEvent(analytics, 'add_to_wishlist', {items:[{...product,affiliation:product?.creator,category:`${categories[0]}`}]});
              res&&setSave(false)
            }catch(e){
            console.log(e)
            setSave(false)
          }
       }

      
    return(
      <div className='flex flex-col w-full space-y-4'>
            
          <div className='relative h-72 w-full'>
         
                <img 
                    src={product?.images?.length !=undefined?product?.images[0] :""}
                    className="w-full h-full rounded-lg"
    
                  />
         

              <div className='absolute top-0 z-30 w-full h-full'>
                    <div className='w-full h-full flex flex-col justify-between items-end px-4 py-2'>
                      {isSaving?
                          <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full text-xs text-slate-800'>
                               Saving...
    
                             </h5>
                           
                             :

                              <h5 className='bg-white flex items-center justify-center p-1.5 rounded-full'
                                onClick={save}
                              >
                                {saved?.includes(product?.id)?
                                      <FaBookmark  
                                         className='text-orange-700'
                                 
                                      />
                                      :
                                      <FaRegBookmark 
                                 
                                      />

                                }
                            
    
                          </h5>


                      }
                   
                       <h5 className='bg-white flex items-center p-2 rounded-full'>
                         {[1,2,3,4,5].map(()=>{
                           return(
                              <MdOutlineStar 
                                className='text-slate-300 '
                              />
                           )
                         })
 
                         }
 
                       </h5>
 
                    </div>
                  

 
              </div>
 
          </div>
          
 
          <div className='flex flex-col space-y-3 h-36'>
              <Link  to={`/product`}
                    state={{
                       product
                  }}
                  
                  >          
                 <h5 className='text-slate-500 text-xl font-semibold' onClick={()=>{
                         logEvent(analytics, 'select_item',{items:[product]})
                         console.log("produvct")
                  }}>{product?.name}</h5>
            </Link>
               
             <h5 className='text-slate-400 text-sm h-9'>{product?.description?.slice(0,70)}{product?.description?.length>70&&"..."}</h5>
             <h5 className=' text-2xl font-semibold'>{product?.price} {product?.currency}</h5>
             {product?.status?.value==="preorder"&&
                <div className='flex w-full items-center py- justify-between'>
                   <h5 className='flex items-center space-x-1'>
                      <IoTime />
                      <span className='text-sm font-semibold text-slate-700'>Available in</span>

                   </h5>
                   <h5 className='text-lg font-semibold'>{product?.availableDate}</h5>

                </div>

             }
 
          </div>
 
          <div className='w-full flex justify-center'>
         {isLoading?
              <ClipLoader 
                 color={"#C74A1F"}
              />
              :
             <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}
                  onClick={()=>{
                     product?.status?.value==="instock" || product?.status?.value==="outstock"?
                      addTocart()
                       :
                      save()
                  }
                   }
                >
                  
                    <MdOutlineShoppingCart 
                          className='text-xl' 
                      />
                       {product?.status?.value==="instock" || product?.status?.value==="outstock"?
                         <span>Add to cart</span>
                         :
                         <span>Pre-order</span>
                       }
                      
 
                </button>
              }
          </div>
 
      </div>
     )
 }