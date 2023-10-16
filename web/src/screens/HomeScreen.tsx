import { ReactElement, useCallback, useContext } from 'react'
import { Button } from 'flowbite-react'

import { AuthContext } from '../providers/AuthProvider'

const HomeScreen = (): ReactElement => {
  const { user, signOut } = useContext(AuthContext)

  const onSignOutButtonClick = useCallback(async () => {
    try {
      await signOut?.()
    } catch (e) {
      // TODO: Handle Sign Out Error
      console.error(e)
    }
  }, [signOut])

  return (
    <div>
      <h5>Home</h5>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={onSignOutButtonClick}>Sign Out</Button>
    </div>
  )
}

export default HomeScreen
