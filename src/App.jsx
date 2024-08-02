import { useState,useEffect } from 'react'
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
import Checkout from './modules/checkout'
import {accountTypeState} from "./modules/recoil/state"
import { useRecoilState } from 'recoil'

import Admin from './modules/admin'
import CreateProduct from './modules/admin/createProduct'
import ProductList from './modules/admin/productList'
import OrderList from './modules/admin/orderlist'
import ProductDetails from './modules/admin/product'
import Orders from './modules/orders'
import Active from './modules/orders/active'
import Profile from './modules/profile'
import EditProduct from './modules/admin/editProduct'
import Order from './modules/admin/order'
import SellerHome from './modules/seller/home'
import SellerProducts from './modules/seller/products'
import SellerServices from './modules/seller/services'
import Information from './modules/seller/information'
import {doc,setDoc,
  addDoc,collection,
  getDoc,getDocs,
  query, where,updateDoc,orderBy,onSnapshot} from "firebase/firestore"
import { db } from './modules/firebase'
import Overview from './modules/admin/overview'
import Customers from './modules/admin/customers'
import Completed from './modules/orders/completed'
import Cancelled from './modules/orders/cancelled'
import Breader from './modules/breeder'
import SellerAdmin from './modules/sellerAdmin'
import SellerOrder from './modules/sellerAdmin/order'
import SellerOrderList from './modules/sellerAdmin/orderlist'
import SellerProductList from './modules/sellerAdmin/productList'
import EditProductSeller from './modules/sellerAdmin/editProduct'
import CreateProductSeller from './modules/sellerAdmin/createProduct'
import OverviewSeller from './modules/sellerAdmin/overview'
import ProductDetailsSeller from './modules/sellerAdmin/product'
import SellerBreeder from './modules/admin/sellers'
import User from './modules/admin/user'
import Search from './modules/search'
import Notifications from './modules/notifications'
import ForgetPassword from './modules/auth/forgot'
import Services from './modules/sellerAdmin/services'
import AddService from './modules/sellerAdmin/addService'
import Guide from './modules/sellerAdmin/guide'
import KYC from './modules/sellerAdmin/kyc'
import PreOrders from './modules/sellerAdmin/preorders'
import Litter from './modules/sellerAdmin/litter'


function App() {
  const [currentUser,setcurrentUser]=useRecoilState(accountTypeState)
  const user = localStorage.getItem("user");
  console.log(user,"user >>>>>")
  useEffect( ()=>{ 
    console.log("here>>>>>")
    setcurrentUser(JSON.parse(user))
    },[])
  useEffect( ()=>{ 
      setcurrentUser(JSON.parse(user))
    if(JSON.parse(user)?.id?.length >0){
      const unsub = onSnapshot(doc(db,"users",JSON.parse(user)?.id), (doc) => {
        
        setcurrentUser({...doc.data(),id:doc?.id})
       });

    
      }else{
        const userLogged = localStorage.getItem("user");
        setcurrentUser(JSON.parse(userLogged ))
      }
 
  },[user])

  return (
    <>
    
          <Routes>
              <Route exact path="/"  element={<Home/>} />
              <Route exact path="/market"  element={<Market/>} />
              <Route exact path="/sellers"  element={<Sellers/>} />
              <Route exact path="/product"  element={<Product/>} />
              <Route exact path="/signup"  element={<Signup/>} />
              <Route exact path="/login"  element={<Login/>} />
              <Route exact path="/forget"  element={<ForgetPassword/>} />
              <Route exact path="/breeder"  element={<Breader/>} />
              <Route exact path="/seller"  element={<Seller/>} >
                   <Route exact path=""  element={<SellerHome/>} />
                   <Route exact path="products"  element={<SellerProducts/>} />
                   <Route exact path="services"  element={<SellerServices/>} />
                   <Route exact path="information"  element={<Information/>} />
                </Route>
              <Route exact path="/account"  element={<Accoount/>} />
              <Route exact path="/wallet"  element={<Wallet/>} />
              <Route exact path="/payment"  element={<Payment/>} />
              <Route exact path="/saved"  element={<Saved/>} />
              <Route exact path="/settings"  element={<Settings/>} />
              <Route exact path="/messages"  element={<Messages/>} />
              <Route exact path="/cart"  element={<Cart/>} />
              <Route exact path="/checkout"  element={<Checkout/>} />

              <Route exact path="/admin"  element={<Admin/>} >
                  <Route exact path="new-product"  element={<CreateProduct/>} />
                  <Route exact path="products"  element={<ProductList/>} />
                  <Route exact path="orders"  element={<OrderList/>} />
                  <Route exact path="product"  element={<ProductDetails/>} />
                  <Route exact path="edit"  element={<EditProduct/>} />
                  <Route exact path="order"  element={<Order/>} />
                  <Route exact path=""  element={<Overview/>} />
                  <Route exact path="customers"  element={<Customers/>} />
                  <Route exact path="sellers"  element={<SellerBreeder/>} />
                  <Route exact path="user"  element={<User/>} />

              </Route>

              <Route exact path="/admin-seller"  element={<SellerAdmin/>} >
                  <Route exact path="new-product"  element={<CreateProductSeller/>} />
                  <Route exact path="products"  element={<SellerProductList/>} />
                  <Route exact path="orders"  element={<SellerOrderList/>} />
                  <Route exact path="product"  element={<ProductDetailsSeller/>} />
                  <Route exact path="edit"  element={<EditProductSeller/>} />
                  <Route exact path="order"  element={<SellerOrder/>} />
                  <Route exact path="services"  element={<Services/>} />
                  <Route exact path="add-service"  element={<AddService/>} />
                  <Route exact path="guide"  element={<Guide/>} />
                  <Route exact path="kyc"  element={<KYC/>} />
                  <Route exact path=""  element={<OverviewSeller/>} />
                  <Route exact path="litter"  element={<Litter/>} />
                  <Route exact path="preorders"  element={<PreOrders/>} />
                

              </Route>


              <Route exact path="/orders/"  element={<Orders/>} >
                  <Route exact path=""  element={<Active/>} />
                  <Route exact path="completed"  element={<Completed/>} />
                  <Route exact path="cancelled"  element={<Cancelled/>} />
               
              </Route>

              <Route exact path="/profile"  element={<Profile/>} />
              <Route exact path="/search"  element={<Search/>} />
              <Route exact path="/notifications"  element={<Notifications/>} />


              
              
           </Routes>
    </>
  )
}

export default App
