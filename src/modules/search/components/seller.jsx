import React,{useEffect,useState} from 'react'
import { MdOutlineStar } from "react-icons/md";
import breeder from "../../../assets/breeder2.png"
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { collection,  onSnapshot,
  doc, getDocs,
  query, orderBy, 
  limit,getDoc,setDoc ,
 updateDoc,addDoc,where } from 'firebase/firestore'
 import { productApi } from '../../api/product';
import { ClipLoader } from 'react-spinners';
import { db } from '../../firebase';
import { useRecoilValue } from 'recoil';
import { accountTypeState,saveTypeState } from '../../recoil/state';
import ReactPaginate from 'react-paginate';


export default function Seller({sellers,setSeller}) {
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 2
  const pageVisited = pageNumber * itemsPerPage

  useEffect(()=>{
    const q = query(collection(db, "users"),where('role','==','breeder'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const products = []
        querySnapshot.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id })

        });


        setSeller(products)


   
      });
   },[])


   const currentItems = sellers?.slice(pageVisited, pageVisited + itemsPerPage)
   const pageCount = Math.ceil(sellers?.length / itemsPerPage)


   const handlePageClick = ({ selected }) => {
    setPageNumber(selected)
}
  return (
    <div className='w-full'>
                 {sellers?.length===0&&

                          <div className='flex w-full justify-center py-20'>
                               <h5 className='text-lg font-semibold'>No result found</h5>

                          </div>
                }


        <div className='flex flex-col space-y-20 w-full' >
            <div  className='grid grid-flow-row grid-cols-3  gap-4 gap-y-8 h-full w-full py-6'>
                      {sellers?.length >0&&currentItems?.map((seller)=>{
                          return(
                            <Card 
                              seller={seller}
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





const Card=({seller})=>{
  return(
    <div className='flex flex-col w-full space-y-4'>
        <div className=' w-full flex flex-col items-center space-y-3'>
           <Link to="/seller" state={{seller:seller}} >
           
              <img 
                src={seller?.img}
                className="rounded-full w-56 h-56"

              />
          </Link>

        <div className='flex flex-col space-y-2 items-center'>
           <h5 className='text-slate-500 text-xl font-semibold'>{seller?.name}</h5>
         
              <h5 className=' text-lg text-slate-500 '>{seller?.animal?.value} Breeder</h5>
         
          

         </div>

            



        </div>

        
        <div className='w-full flex justify-center py-6'>
        <Link to="/seller" state={{seller:seller}} >
            <button className='text-white py-3 space-x-4 px-4 rounded-lg flex justify-center items-center w-full' style={{background:"#C74A1F"}}>
                      
                      <MdOutlineShoppingCart 
                          className='text-xl' 
                        />
                        <span>View profile</span>

           </button>
    </Link>
        </div>

    </div>
   )
}
