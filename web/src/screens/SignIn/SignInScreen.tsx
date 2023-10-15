import { ReactElement } from 'react'
import classNames from 'classnames'

import SignInCard from './SignInCard'

const SignInScreen = (): ReactElement => {
  return (
    <div
      className={classNames(
        'fixed',
        'left-1/2 top-1/2',
        '-translate-x-1/2 -translate-y-1/2'
      )}
    >
      <SignInCard className="max-w-sm" />
    </div>
  )
}

export default SignInScreen
