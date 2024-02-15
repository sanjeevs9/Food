import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import SellerSignup from './Components/Seller/SellerSignup'


import './App.css'
import SellerSignin from './Components/Seller/SellerSignin';
import Help from './Components/Help';
import Front from './Components/Front';
import DropDown from './Components/DropDown';
import Dashboard from './Components/User/Dashboard';
import FoodComponent from './Components/FoodComponent';
import Carousel from './Components/Carousel';
import Resturant from './Components/Resturant';
import Navbar from './Components/User/Navbar';
import Search from './Components/User/Search';
import Footer from './Components/Footer';
import Sdashoard from './Components/Seller/Sdashboard';
import AddMenu from './Components/Seller/Addmenu';

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/create' element={<SellerSignup/>}/>
      <Route path='/login' element={<SellerSignin/>}/>
      <Route path='/' element ={<Front/>}/>
      <Route path='/user' element={<Dashboard/>}/>
      <Route path='/addmenu' element={<AddMenu/>}/>
      <Route path='/vendor' element={<Sdashoard/>}/>
      {/* <Route path='/*' element={<Resturant name="Uncles Cafe" description="New Fast Food Chain" imgUrl="https://static.vecteezy.com/system/resources/previews/023/010/452/non_2x/the-fast-food-meal-in-the-black-background-with-ai-generated-free-photo.jpg"/>}/> */}
      <Route path="/*" element={<Sdashoard/>}/>
      
     
    </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
