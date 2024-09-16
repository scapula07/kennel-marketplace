import React from 'react'
import {QRCodeCanvas} from 'qrcode.react';
export default function Qrcode({ setTrigger}) {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-white py-20 px-10 space-y-6 rounded-lg'>
            <QRCodeCanvas
                value={"https://naphtaliduniya.netlify.app/assets/hero-img-ae22a4e5.jpg"}
                title={"Title for my QR Code"}
                size={200}
                bgColor={"#000000"}
                fgColor={"#ffffff"}
                level={"H"}
                minVersion={10}
                marginSize={0}
                imageSettings={{
                    src: "/full logo.png",
                    x: undefined,
                    y: undefined,
                    height: 50,
                    width: 50,
                    opacity: 9,
                    excavate: true,
                }}
             />
             <div className='flex w-full justify-center space-x-4'>
                <button className='bg-orange-700 text-xs py-2 px-3 rounded-full text-white'>Copy Link</button>
                <button className='text-sm font-semibold hover:text-orange-500'
                   onClick={()=> setTrigger(false)}
                 >
                    Close
                </button>


             </div>
           

    </div>
  )
}
