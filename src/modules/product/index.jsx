import React from 'react'
import Layout from '../../layout'
import Gallery from './components/gallery'
import Details from './components/details'
import Actionsection from './components/actionsection'
import { useLocation,useParams} from "react-router-dom";


export default function Product() {
      const location =useLocation()

      const product=location?.state?.product

      console.log(product,"prodyct ")
  return (
    <Layout>
            <div className='h-full w-full flex flex-col px-28 py-10'>
                  <div>

                  </div>

                  <div className=''>
                      <Gallery 
                         images={product?.images}
                      />

                  </div>

                  <div className='flex w-full space-x-8 '>
                         <Details
                            product={product} 
                         />

                         <Actionsection
                                product={product} 
                          />

                  </div>

            </div>

    </Layout>
    
  )
}
