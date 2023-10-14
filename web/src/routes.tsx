import { RouteObject } from 'react-router-dom'

import Root from './Root'
import ErrorScreen from './screens/ErrorScreen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorScreen />,
  },
]
