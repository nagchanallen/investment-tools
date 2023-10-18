import { ReactElement, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import LoadingScreen from './screens/LoadingScreen'
import ErrorDialogProvider from './providers/ErrorDialogProvider'

const Root = (): ReactElement => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ErrorDialogProvider>
        <Outlet />
      </ErrorDialogProvider>
    </Suspense>
  )
}

export default Root
