import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { RFIDContextProvider } from './context/RFIDContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RFIDContextProvider>
      <App />
      </RFIDContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
