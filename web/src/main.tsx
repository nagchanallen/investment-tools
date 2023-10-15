import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initializeApp } from 'firebase/app'

import './index.css'
import Config from './config'
import { routes } from './routes'
import AuthProvider from './providers/AuthProvider'

initializeApp(Config.firebase)

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
