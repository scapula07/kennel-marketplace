import React,{useEffect,useState} from 'react'
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { analyticApi } from '../api/analytics';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,onSnapshot,orderBy}  from "firebase/firestore";
import { db } from '../firebase';
import { AiOutlineEye } from "react-icons/ai";
import PieChartComponent from './components/piechart';
import TopCities from './components/cities';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const monthNames = [
    "","January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
export default function Overview() {
      const date =new Date()
      const currentUser=useRecoilValue(accountTypeState)
      const [stats,setStats]=useState([{metrics:{}}])
      const [productStat,setProductStat]=useState([])
      const [cities,setCities]=useState([])
      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is zero-based, so adding 1
      const year= date.getFullYear()
      const formattedDate = `${day},${monthNames[month]},${year}`;


      const [orders,setOrders]=useState([])
      const [areContacts,setContacts]=useState("")
      
    
      useEffect(()=>{
      
          const q = query(collection(db, "orders"),where('creator', '==', currentUser?.id),orderBy('time', 'desc'));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const products = []
                querySnapshot.forEach((doc) => {
                  products.push({ ...doc.data(), id: doc.id })
      
                });
                products?.length===0 &&setContacts("No contact")
                products?.length >0 &&setContacts("")
      
          setOrders(products)
          });
      
      },[])




      useEffect(()=>{
        const getShippingRate=async()=>{
            try{
                const result =await analyticApi.userAnalytics()
                const result1 =await analyticApi.productAnalytics()
                const result2 =await analyticApi.locationAnalytics()
                console.log(result?.data?.data,"tttt")

                const data = result?.data?.data?.map((entry) => {
                  const metrics = {
                    activeUsers: entry.metricValues[0].value,
                    firstTimePurchaserRate: entry.metricValues[1].value,
                    newUsers: entry.metricValues[2].value,
                    totalPurchasers: entry.metricValues[3].value,
                    totalUsers: entry.metricValues[4].value,
                    userEngagementDuration: entry.metricValues[5].value,
                    engagementRate: entry.metricValues[6].value
                  };   
                 

                  return {metrics}
             
                
                });
                 setStats(data) 
                 
                 
                 const data3 = result2?.data?.data?.map((entry) => {
                      const dimensions = {
                        city: entry.dimensionValues[0].value,
                    
                      };
                      const metrics = {
                        rate: entry.metricValues[0].value,
                      
                      };   
                 

                      return { ...dimensions, ...metrics };
             
                
                });

                setCities(data3)
            
                const data2 =result1?.data?.data?.map((entry, index) => {
                  const dimensions = {
                    itemBrand: entry.dimensionValues[0].value,
                    itemCategory: entry.dimensionValues[1].value,
                    
                    itemId: entry.dimensionValues[2].value,
                    itemName: entry.dimensionValues[3].value
                  };
                
                  const metrics = {
                    itemRevenue: entry.metricValues[0].value,
                    itemsAddedToCart: entry.metricValues[1].value,
                    itemsCheckedOut: entry.metricValues[2].value,
                    itemsPurchased: entry.metricValues[3].value,
                    itemsViewed: entry.metricValues[4].value
                  };
                
                  return { ...dimensions, ...metrics };
                });
           
                setProductStat(data2)

               
            
             }catch(e){
                console.log(e)
             }

        }
        getShippingRate()
      },[currentUser])


      


   

  return (
    <div className='w-full text-black pb-10'>
                
                <div className='flex flex-col space-y-3'>
                <h5 className='text-white font-light text-sm'>Admin/Overview</h5>
                
                  <h5 className='text-lg font-semibold text-white'>Overview</h5>

                </div>


                <div className='flex w-full'>

                        <div className='grid grid-cols-2  gap-3 py-6'>
                              {[
                              {
                                title:"Total products",
                                total:"4",
                                icon:<MdOutlineProductionQuantityLimits />
                              },
                              {
                                title:"Total product purchase",
                                total:stats?.length >0?`$${stats[0]?.metrics?.totalPurchasers}`:0,
                                icon:<MdOutlineCardGiftcard  />
                              },
                              {
                                title:"Active users",
                                total:stats?.length >0?stats[0]?.metrics?.activeUsers:0,
                                icon:<HiUsers />
                              },
                              {
                                title:"Total users",
                                total:stats?.length >0?stats[0]?.metrics?.totalUsers:0,
                                icon:< FaUsers/>
                              }
                        

                              ].map((item)=>{
                                  return(
                                    <div className='w-full flex bg-white shadow rounded-sm justify-between  px-4 py-2'>
                                           <div className='flex flex-col'>
                                               <h5 className='text-sm font-light'>{item?.title}</h5>
                                               <h5 className='text-lg font-semibold text-black'>{item?.total}</h5>
                                               <h5 className='text-xs font-light text-slate-700'>{"Last 30 days"}</h5>
                                          </div>
                                          <div className=''>
                                              <h5 className='text-orange-500'>{item?.icon}</h5>
                                          </div>

                                    </div>
                                  )
                              })

                              }

                        <TopCities 
                            data={cities}
                          />

                        </div>

                        <div className='w-1/3 px-6 flex '>
                       
                            < PieChartComponent
                               value={stats[0]?.metrics?.engagementRate} 
                            />
                          

                        </div>

                </div>

                <div className='flex flex-col w-full space-y-10'>
                    <div className='w-full border px-4 py-4 bg-white'>
                        <h5 className='font-semibold'>Top products</h5>

                        <div className='grid grid-cols-4  w-full justify-between py-4 gap-4 '>
                          {productStat?.sort((a, b) => parseInt(b.itemsAddedToCart) - parseInt(a.itemsAddedToCart))?.map((stat)=>{
                             return(
                               <Product 
                                 stat={stat}
                               />
                             )
                          })

                          }

                        </div>


                    </div>



                    <div className='w-full border px-4 py-4 bg-white space-y-6'>
                        <h5 className='font-semibold'>Recent Active orders</h5>

                          <Table 
                            orders={orders}
                          />

                        {orders?.length ===0&&areContacts?.length ==0&&
                                  <div className='w-full flex justify-center py-5 '>
                                      <ClipLoader 
                                            color={"orange"}
                                            loading={true}
                                            size="12"
                                      />
                                  </div>
                                  }


                       </div>
              
              
                </div>

               



    </div>
  )
}



const Product=({stat})=>{
   const [product,setProduct]=useState({})
    // console.log(stat,"staa")
    useEffect(()=>{
      
    if(stat?.itemId?.length != undefined ){
      const unsub = onSnapshot(doc(db,"products",stat?.itemId), (doc) => {
        setProduct({...doc.data(),id:doc?.id})
       });
      }
    },[])
 
   return(
    <div className='flex flex-col py-4 px-2 border w-full'>
    <div className='flex justify-between w-full'>
        <img 
          src={product?.images?.length >0&&product?.images[0]}
          className="w-8 h-8 rounded-lg"
        />
        <h5 className='flex items-center space-x-0.5'>
           <span className='text-xs text-slate-600 font-light'>{stat?.itemsViewed}</span>

           <AiOutlineEye 
             className='text-orange-600 font-bold'
           />
      
        </h5>
   </div>
    <div className='space-y-3'>
      <h5>{product?.name}</h5>
      <p className='text-slate-700 text-xs'>{product?.description?.slice(0,100)}</p>
      <h5 className='text-xs font-semibold'>Total items in cart:{stat?.itemsAddedToCart}</h5>
   </div>
</div>
   )
}




const Table=({orders})=>{
  return(
    <div>
        <table class="table-auto w-full border-separate border-spacing-1">
                <thead className='py-2'>
                <tr >
                      {
                        ["ID",
                          "Date",
                        "Status",
                        "Customer",
                        "Products",
                        "Price",
                      

                        ].map((text)=>{
                            return(
                            <th className='py-1 text-xs text-slate-400 text-start border px-2 py-2'>{text}</th>
                        )
                        })
                    }
                         </tr>
                    
                </thead>

                <tbody className='w-full py-4'>
                    
                    {orders?.map((order,index)=>{
                         
                          return(
                          
                              <Row 
                                 order={order}
                              />
                              

                          )
                      })

                    }
                 


                </tbody>

 </table>

    </div>
  )
}


const Row=({order})=>{
const [customer,setCustomer]=useState({})
const [products,setProducts]=useState()

useEffect(()=>{

  if(order?.creator?.length != undefined){
    const unsub = onSnapshot(doc(db,"users",order?.creator), (doc) => {
      console.log(doc.data(),"daa")
  
      setCustomer({...doc.data(),id:doc?.id})
     });
    }
   },[])

   useEffect(()=>{

      if(order?.products?.length >0){
        const ids = order?.products?.map(obj => obj.id);
        
        const unsub = onSnapshot(doc(db,"products",ids[0]), (doc) => {
          console.log(doc.data(),"daa")
      
          setProducts({...doc.data(),id:doc?.id})
         });

        }
     },[order])


   console.log(order?.products,"prod")

  const date = new Date(order?.time);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so adding 1
  const year= date.getFullYear()
  const formattedDate = `${day},${monthNames[month]},${year}`;

  console.log(formattedDate);

return(
  <tr className='border-b '>
      <Link to="/admin/order" state={{order}}>
  <td className='flex items-center space-x-4 border px-2 py-2'>
      <input
         type={"checkbox"}
         className="py-2 px-2"
       />
       <span className='text-sm font-light text-slate-500'>{order?.id}</span>

  </td>
  </Link>
  <td className='text-sm font-light text-slate-500 border px-2 py-2'>{formattedDate}</td>
  <td className='text-sm font-light text-slate-500 border px-2 py-2'>
   {order?.status=="active"?
      <span className='text-yellow-500'>{"Pending"}</span>
      :
      <span>{order?.status}</span>
   }
  </td>
  <td className='text-sm font-light text-slate-500 flex items-center space-x-1 border px-2 py-2'>
    <span className='rounded-full bg-orange-400 text-white text-xs font-semibold h-4 w-4 flex items-center justify-center'>{customer?.name?.slice(0,1)}</span>
   <span> {customer?.name}</span>
    </td>
  <td className='text-sm font-light text-slate-500 border px-2 py-2'>
      {products?.name}

  </td>
  <td className='text-sm font-light text-slate-500 border px-2 py-2'>${order?.total}</td>


</tr>

)
}