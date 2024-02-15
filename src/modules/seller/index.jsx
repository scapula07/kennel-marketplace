import React from 'react'
import Layout from '../../layout'
import Cover from './components/cover'
import Info from './components/info'
import Sections from './components/sections'
import { useLocation,useParams} from "react-router-dom";



export default function Seller() {
  const location =useLocation()

  const seller=location?.state?.seller

  console.log(seller,"prodyct ")
  return (
    <Layout>
          <div className='h-full w-full'>
              <Cover
                seller={seller}
               />
              <Info
                  seller={seller}
               />

              <Sections />

          </div>

    </Layout>
   
  )
}
