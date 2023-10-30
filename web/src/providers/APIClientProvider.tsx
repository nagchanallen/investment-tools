import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react'
import axios, { AxiosInstance } from 'axios'

import { AuthContext } from './AuthProvider'
import Config from '../config'

const axiosInstance = axios.create({
  baseURL: Config.apiBaseUrl,
})

export const APIClientContext = createContext<AxiosInstance>(undefined!)

const APIClientProvider = (props: PropsWithChildren): ReactElement => {
  const { children } = props

  const { user } = useContext(AuthContext)

  useLayoutEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const idToken = await user?.getIdToken()

        if (idToken) {
          config.headers.Authorization = `Bearer ${idToken}`
        }

        return config
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(interceptor)
    }
  }, [user])

  return (
    <APIClientContext.Provider value={axiosInstance}>
      {children}
    </APIClientContext.Provider>
  )
}

export default APIClientProvider
