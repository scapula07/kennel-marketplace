import React from 'react'
import Layout from '../../layout'
import Gallery from './components/gallery'
import Details from './components/details'
import Actionsection from './components/actionsection'

export default function Product() {
  return (
    <Layout>
            <div className='h-full w-full flex flex-col px-28 py-10'>
                  <div>

                  </div>

                  <div className=''>
                      <Gallery />

                  </div>

                  <div className='flex w-full space-x-8 '>
                         <Details />

                         <Actionsection />

                  </div>

            </div>

    </Layout>
    
  )
}
