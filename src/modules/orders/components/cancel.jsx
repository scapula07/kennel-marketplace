import React, { useState } from 'react'
import Select from 'react-select';
import { IoAlertCircleOutline } from "react-icons/io5";
import { BeatLoader } from 'react-spinners';

export default function Cancel({cancelOrder,cancel}) {
    const options = [
        { value: 'Not interested in order anymore', label: 'Not interested in order anymore' },
        { value: 'Others', label: 'Others' },
      ]
      const [reason,setReason]=useState({})
  return (
    <div className='w-full flex flex-col'>
            <div className='border-b  flex flex-col  px-4 pt-2  pb-4 space-y-3'>
                    <h5 className='text-sm font-light text-slate-600'>Select a reason for cancellation</h5>
                    <Select 
                            options={options}
                            defaultInputValue={options[0]?.value}
                            className="text-sm"
                            value={reason}
                            onChange={(opt) => {
                                setReason(opt);
                               
                              }}
                    />
                    <h5 className='flex items-center space-x-2'>
                          <IoAlertCircleOutline />
                          <span className='text-xs font-semibold'>After submitting your request,you will receive an email with the details about your cancellation</span>

                    </h5>

           </div>

           <div className='flex w-full py-2 justify-end'>
                <button className='bg-orange-700 py-2 px-4 text-xs text-white rounded-sm'
                  onClick={()=>!cancel&&cancelOrder(reason?.label)}
                >
                    {!cancel?
                        "Submit"
                        :
                        <BeatLoader size={8} color="orange" />

                    }
              </button>

           </div>

    </div>
  )
}
