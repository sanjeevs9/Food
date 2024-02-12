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
      <Route path='/exp' element={<DropDown/>}/>
      <Route path='/*' element={<Help/>}/>
    </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
