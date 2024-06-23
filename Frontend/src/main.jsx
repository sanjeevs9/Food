import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import DetailsProcider, { DetailsContext } from './Components/Seller/SellerDetailsApi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <DetailsProcider>
    <App />
    </DetailsProcider>
  </RecoilRoot>
)
