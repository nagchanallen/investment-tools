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
  user: User | null
  signInGoogle: () => Promise<UserCredential>
  signOut: () => Promise<void>
}

// We assume there is a global auth provider in the main function level
export const AuthContext = createContext<IAuthContext>(undefined!)

const AuthProvider = (props: PropsWithChildren): ReactElement => {
  const { children } = props

  const [currentUser, setCurrentUser] = useState<IAuthContext['user']>(null)

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
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [auth])

  const contextValue = useMemo(
    () => ({
      user: currentUser,
      signInGoogle,
      signOut,
    }),
    [currentUser, signInGoogle, signOut]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
