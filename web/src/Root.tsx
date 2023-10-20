import { ReactElement, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import LoadingScreen from './screens/LoadingScreen'
import ErrorDialogProvider from './providers/ErrorDialogProvider'
import AppNavbar from './components/AppNavbar'

const Root = (): ReactElement => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ErrorDialogProvider>
        <AppNavbar />
        <Outlet />
      </ErrorDialogProvider>
    </Suspense>
  )
}

export default Root
