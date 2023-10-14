import { ReactElement, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import LoadingScreen from './screens/LoadingScreen'

const Root = (): ReactElement => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  )
}

export default Root
