import { ReactElement, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../providers/AuthProvider'
import { paths } from '../paths'

const ProtectedRoute = (): ReactElement => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to={paths.SignIn} replace={true} />
  }

  return <Outlet />
}

export default ProtectedRoute
