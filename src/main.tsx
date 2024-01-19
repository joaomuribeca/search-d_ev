import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    
    <ToastContainer />
  </React.StrictMode>,
)
