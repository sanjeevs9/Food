import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';


import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>} />
    </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
