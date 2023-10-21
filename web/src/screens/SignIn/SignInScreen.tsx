import { ReactElement, useCallback, useContext } from 'react'
import classNames from 'classnames'
import { Navigate, useNavigate } from 'react-router-dom'

import { paths } from '../../paths'
import { AuthContext } from '../../providers/AuthProvider'
import useErrorDialog from '../../hooks/useErrorDialog'
import SignInCard from './SignInCard'

const SignInScreen = (): ReactElement => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const { showError } = useErrorDialog()

  const signInGoogle = useCallback(async () => {
    try {
      await authContext.signInGoogle()
      navigate(paths.Home, { replace: true })
    } catch (e) {
      console.error(e)
      showError('Google Sign In Error. Please try again.')
    }
  }, [authContext, navigate, showError])

  if (authContext.user) {
    return <Navigate to={paths.Home} replace={true} />
  }

  return (
    <div
      className={classNames(
        'fixed',
        'left-1/2 top-1/2',
        '-translate-x-1/2 -translate-y-1/2'
      )}
    >
      <SignInCard className="max-w-sm" signInGoogle={signInGoogle} />
    </div>
  )
}

export default SignInScreen
