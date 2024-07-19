import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import DetailsProcider, { DetailsContext } from './Components/Seller/SellerDetailsApi.jsx'
import Resturant from './Components/Resturant.jsx'
import ResturantProvider from './Components/User/ResturantContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ResturantProvider>
    <DetailsProcider>
    <App />
    </DetailsProcider>
    </ResturantProvider>
  </RecoilRoot>
)
