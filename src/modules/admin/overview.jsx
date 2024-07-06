import React,{useEffect,useState} from 'react'
import { useRecoilValue } from 'recoil';
import { accountTypeState } from '../recoil/state';
import { analyticApi } from '../api/analytics'; 
const monthNames = [
    "","January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
export default function Overview() {
      const date =new Date()
      const currentUser=useRecoilValue(accountTypeState)
      const [stats,setStats]=useState({})
      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is zero-based, so adding 1
      const year= date.getFullYear()
      const formattedDate = `${day},${monthNames[month]},${year}`;

      console.log(formattedDate);


      useEffect(()=>{
        const getShippingRate=async()=>{
            try{
                const result =await analyticApi.userAnalytics()
                const result1 =await analyticApi.productAnalytics()
                console.log(result1?.data?.data)

                const data = result?.data?.data?.map((entry) => {
                  const metrics = {
                    activeUsers: entry.metricValues[0].value,
                    firstTimePurchaserRate: entry.metricValues[1].value,
                    newUsers: entry.metricValues[2].value,
                    totalPurchasers: entry.metricValues[3].value,
                    totalUsers: entry.metricValues[4].value,
                    userEngagementDuration: entry.metricValues[5].value
                  };      
             
                  setStats(metrics)
                });

                const data2 =result1?.data?.data?.map((entry, index) => {
                  const dimensions = {
                    itemBrand: entry.dimensionValues[0].value,
                    itemCategory: entry.dimensionValues[1].value,
                    itemCategory2: entry.dimensionValues[2].value,
                    itemId: entry.dimensionValues[3].value,
                    itemName: entry.dimensionValues[4].value
                  };
                
                  const metrics = {
                    itemRevenue: entry.metricValues[0].value,
                    itemsAddedToCart: entry.metricValues[1].value,
                    itemsCheckedOut: entry.metricValues[2].value,
                    itemsPurchased: entry.metricValues[3].value,
                    itemsViewed: entry.metricValues[4].value
                  };
                
                  return { dimensions, metrics };
                });
                console.log(data2,"2")
            
             }catch(e){
                console.log(e)
             }

        }
        getShippingRate()
      },[currentUser])


  return (
    <div className='w-full'>
                <div className='flex flex-col space-y-3'>
                <h5 className='text-white font-light text-sm'>Admin/Overview</h5>
                
                  <h5 className='text-lg font-semibold text-white'>Overview</h5>

                </div>

                <div className='flex w-full space-x-4 py-6'>
                      {[
                      {
                        title:"Total products",
                        total:"4"
                      },
                      {
                        title:"Active users",
                        total:stats?.activeUsers
                      },
                      {
                        title:"New Users",
                        total:stats?.newUsers
                      },
                      {
                        title:"Total users",
                        total:"4"
                      }
                 

                      ].map((item)=>{
                          return(
                            <div className='bg-white rounded-lg py-1.5 px-4 flex flex-col w-1/3 space-y-2'>
                                 <h5 className='text-sm font-light text-slate-600'>{item?.title}</h5>
                                 <h5 className='text-xl font-semibold text-slate-600'>{item?.total}</h5>
                                 <h5 className='font-light text-slate-500 text-end text-sm'>{formattedDate}</h5>
                            </div>
                          )
                      })

                      }

                </div>



    </div>
  )
}
