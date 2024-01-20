import React from 'react'

export default function Transactions() {
  return (
    <div className='flex flex-col'>
          <div className='flex justify-between'>
             <h5 className='text-xl text-slate-600'>Transactions history </h5>

             <select className='border px-1 rounded-lg w-44 py-1'>
                <option>Sort by</option>
             </select>

          </div>

    </div>
  )
}
