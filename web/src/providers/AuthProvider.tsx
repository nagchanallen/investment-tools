import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth'

type User = FirebaseUser

export interface IAuthContext {
  isInitialized: boolean
  user: User | null | undefined
  signInGoogle: () => Promise<UserCredential>
  signOut: () => Promise<void>
}

// We assume there is a global auth provider in the main function level
export const AuthContext = createContext<IAuthContext>(undefined!)

const AuthProvider = (props: PropsWithChildren): ReactElement => {
  const { children } = props

  const [currentUser, setCurrentUser] =
    useState<IAuthContext['user']>(undefined)

  const isInitialized = currentUser !== undefined

  const auth = getAuth()

  const signInGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    return userCredential
  }, [auth])

  const signOut = useCallback(async () => {
    await auth.signOut()
  }, [auth])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [auth])

  const contextValue = useMemo(
    () => ({
      isInitialized,
      user: currentUser,
      signInGoogle,
      signOut,
    }),
    [isInitialized, currentUser, signInGoogle, signOut]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
