import { ReactElement, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../providers/AuthProvider'
import { paths } from '../paths'
import LoadingScreen from '../screens/LoadingScreen'

const ProtectedRoute = (): ReactElement => {
  const { isInitialized, user } = useContext(AuthContext)

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to={paths.SignIn} replace={true} />
  }

  return <Outlet />
}

export default ProtectedRoute
