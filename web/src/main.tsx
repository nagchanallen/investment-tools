import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import * as Sentry from '@sentry/react'

import './index.css'
import Config from './config'
import { routes } from './routes'
import AuthProvider from './providers/AuthProvider'
import AppQueryClientProvider from './providers/AppQueryClientProvider'
import APIClientProvider from './providers/APIClientProvider'

Sentry.init({
  dsn: Config.sentry.dsn,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

initializeApp(Config.firebase)

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <APIClientProvider>
        <AppQueryClientProvider>
          <RouterProvider router={router} />
        </AppQueryClientProvider>
      </APIClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
