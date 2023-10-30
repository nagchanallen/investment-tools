import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  PropsWithChildren,
  ReactElement,
  useContext,
  useLayoutEffect,
} from 'react'

import { AuthContext } from './AuthProvider'
import queryKeys from '../queries/queryKeys'

const queryClient = new QueryClient()

const AppQueryClientProvider = (props: PropsWithChildren): ReactElement => {
  const { children } = props

  const { user } = useContext(AuthContext)

  useLayoutEffect(() => {
    queryClient
      .resetQueries({ queryKey: queryKeys.API() })
      .then()
      .catch(console.error)
  }, [user])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default AppQueryClientProvider
