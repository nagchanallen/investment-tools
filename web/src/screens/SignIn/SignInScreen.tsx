import { ReactElement, useCallback, useContext } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { paths } from '../../paths'
import { AuthContext } from '../../providers/AuthProvider'
import SignInCard from './SignInCard'

const SignInScreen = (): ReactElement => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const signInGoogle = useCallback(async () => {
    try {
      await authContext.signInGoogle()
      navigate(paths.Home, { replace: true })
    } catch (e) {
      console.error(e)
    }
  }, [authContext, navigate, showError])

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
