import React from 'react'

const monthNames = [
    "","January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
export default function Overview() {
      const date =new Date()

      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is zero-based, so adding 1
      const year= date.getFullYear()
      const formattedDate = `${day},${monthNames[month]},${year}`;

      console.log(formattedDate);
  return (
    <div className='w-full'>
                <div className='flex flex-col space-y-3'>
                <h5 className='text-white font-light text-sm'>Admin/Overview</h5>
                
                  <h5 className='text-lg font-semibold text-white'>Overview</h5>

                </div>

                <div className='flex w-full space-x-4 py-6'>
                      {[{
                        title:"Sales",
                        total:"0"
                      },
                      {
                        title:"Customer",
                        total:"4"
                      }

                      ].map((item)=>{
                          return(
                            <div className='bg-white rounded-lg py-4 px-4 flex flex-col w-1/3 space-y-2'>
                                 <h5 className='text-lg font-light text-slate-600'>{item?.title}</h5>
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
