import { RouteObject } from 'react-router-dom'

import Root from './Root'
import ErrorScreen from './screens/ErrorScreen'
import SignInScreen from './screens/SignIn/SignInScreen'
import HomeScreen from './screens/HomeScreen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: 'sign-in',
        element: <SignInScreen />,
      },
      {
        path: 'home',
        element: <HomeScreen />,
      },
    ],
  },
]
