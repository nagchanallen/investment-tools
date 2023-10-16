import { Navigate, RouteObject } from 'react-router-dom'

import Root from './Root'
import ErrorScreen from './screens/ErrorScreen'
import SignInScreen from './screens/SignIn/SignInScreen'
import HomeScreen from './screens/HomeScreen'
import ProtectedRoute from './components/ProtectedRoute'
import { paths } from './paths'

export const routes: RouteObject[] = [
  {
    path: paths.Root,
    element: <Navigate to={paths.Home} replace={true} />,
  },
  {
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: paths.SignIn,
        element: <SignInScreen />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: paths.Home,
            element: <HomeScreen />,
          },
        ],
      },
    ],
  },
]
