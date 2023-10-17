import { ReactElement, useCallback, useContext } from 'react'
import { Button } from 'flowbite-react'

import { AuthContext } from '../providers/AuthProvider'
import useErrorDialog from '../hooks/useErrorDialog'

const HomeScreen = (): ReactElement => {
  const { user, signOut } = useContext(AuthContext)

  const { showError } = useErrorDialog()

  const onSignOutButtonClick = useCallback(async () => {
    try {
      await signOut?.()
    } catch (e) {
      console.error(e)
      showError('Sign Out Error')
    }
  }, [showError, signOut])

  return (
    <div>
      <h5>Home</h5>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={onSignOutButtonClick}>Sign Out</Button>
    </div>
  )
}

export default HomeScreen
