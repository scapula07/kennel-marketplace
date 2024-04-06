import React ,{useEffect,useState} from 'react'
import Layout from '../../layout'
import Cover from './components/cover'
import Info from './components/info'
import Sections from './components/sections'
import { useLocation,useParams} from "react-router-dom";



export default function Seller() {
  const location =useLocation()
  const sellerInfo=location?.state?.seller
  const [seller,setSeller]=useState(sellerInfo)

  

  console.log(seller,"prodyct ")
  useEffect(() => {
       
    window.scrollTo(0, 0);

  
}, []);
  return (
    <Layout>
          <div className='h-full w-full'>
              <Cover
                seller={seller}
               />
              <Info
                  seller={seller}
               />

              <Sections 
                seller={seller}
              />

          </div>

    </Layout>
   
  )
}
