import React from 'react'
import Layout from '../../layout'
import Cover from './components/cover'
import Info from './components/info'
import Sections from './components/sections'

export default function Seller() {
  return (
    <Layout>
          <div className='h-full w-full'>
              <Cover />
              <Info />

              <Sections />

          </div>

    </Layout>
   
  )
}
