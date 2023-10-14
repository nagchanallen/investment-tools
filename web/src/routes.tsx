import { RouteObject } from 'react-router-dom'

import Root from './Root'
import ErrorScreen from './screens/ErrorScreen'
import LoginScreen from './screens/Login/LoginScreen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: 'login',
        element: <LoginScreen />,
      },
    ],
  },
]
