import { Navigate, RouteObject } from 'react-router-dom'

import Root from './Root'
import { paths } from './paths'
import ErrorScreen from './screens/ErrorScreen'
import SignInScreen from './screens/SignIn/SignInScreen'
import HomeScreen from './screens/HomeScreen'
import PortfolioScreen from './screens/Portfolio/PortfolioScreen'
import ProtectedRoute from './components/ProtectedRoute'

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
          {
            path: paths.Portfolio,
            element: <PortfolioScreen />,
          },
        ],
      },
    ],
  },
]
