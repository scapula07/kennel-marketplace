import React from 'react'
import { FiSearch } from "react-icons/fi";


export default function ProductList() {
  return (
    <div className='w-full space-y-4'>
                <div className='flex flex-col space-y-2 '>
                    <h5 className='text-white font-light text-sm'>Admin/Products</h5>
                </div>


                <div className='w-full bg-white rounded-lg py-6 px-4 flex flex-col space-y-10'>
                        <div className='flex items-center justify-between'>
                              <h5 className='text-xl font-semibold text-black'>All Products</h5>

                              <div className='flex items-center'>
                                  <button className='bg-orange-400 text-white rounded-lg py-2 px-4 text-sm'>+ New product</button>

                              </div>

                        </div>

                        <div className='flex w-full justify-end'>
                                 <div className='border py-1.5 px-3 rounded-lg flex w-1/4 justify-between bg-white'>
                                    <input
                                       placeholder='Search'
                                       className='outline-none border-0 w-3/5 text-sm font-light '
                                    
                                      />
                                    <FiSearch
                                       className='text-slate-600'
                                    />

                                </div>

                        </div>

                        <Table />

                </div>


              
    
    
    
    </div>
  )
}



const Table=()=>{
      return(
        <div>
            <table class="table-auto w-full border-separate border-spacing-0.5">
                    <thead className='py-2'>
                    <tr >
                          {
                            ["Product",
                              "Catagory",
                            "Price",
                            "SKU",
                            "Quantity",
                            "status",
                            "Action"

                            ].map((text)=>{
                                return(
                                <th className='py-1 text-xs text-slate-500 text-start'>{text}</th>
                            )
                            })
                        }
                             </tr>
                        
                    </thead>

                    <tbody className='w-full '>
                        
                        {[1,2,3,4]?.map(()=>{
                            return(
                                  <tr className='border-b '>
                                       <td>1</td>
                                       <td>2</td>
                                       <td>3</td>
                                       <td>4</td>
                                       <td>5</td>
                                       <td>6</td>
                                       <td>7</td>

                                  </tr>

                              )
                          })

                        }
                     


                    </tbody>

     </table>

        </div>
      )
}