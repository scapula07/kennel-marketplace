import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './modules/home'
import {Routes,Route,BrowserRouter as Router } from "react-router-dom"
import Market from './modules/market'
import Sellers from './modules/sellers'
import Product from './modules/product'
import Signup from './modules/auth/signup'
import Login from './modules/auth/login'
import Seller from './modules/seller'
import Accoount from './modules/account'
import Wallet from './modules/wallet'
import Payment from './modules/payment'
import Saved from './modules/saved'
import Settings from './modules/settings'
import Messages from './modules/messages'
import Cart from './modules/cart'


function App() {


  return (
    <>
    
          <Routes>
              <Route exact path="/"  element={<Home/>} />
              <Route exact path="/market"  element={<Market/>} />
              <Route exact path="/sellers"  element={<Sellers/>} />
              <Route exact path="/product"  element={<Product/>} />
              <Route exact path="/signup"  element={<Signup/>} />
              <Route exact path="/login"  element={<Login/>} />
              <Route exact path="/seller"  element={<Seller/>} />
              <Route exact path="/account"  element={<Accoount/>} />
              <Route exact path="/wallet"  element={<Wallet/>} />
              <Route exact path="/payment"  element={<Payment/>} />
              <Route exact path="/saved"  element={<Saved/>} />
              <Route exact path="/settings"  element={<Settings/>} />
              <Route exact path="/messages"  element={<Messages/>} />
              <Route exact path="/cart"  element={<Cart/>} />

              
              
           </Routes>
    </>
  )
}

export default App
