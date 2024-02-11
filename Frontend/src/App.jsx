import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import SellerSignup from './Components/Seller/SellerSignup'


import './App.css'
import SellerSignin from './Components/Seller/SellerSignin';

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/create' element={<SellerSignup/>}/>
      <Route path='/login' element={<SellerSignin/>}/>
    </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
