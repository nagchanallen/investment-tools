import { ReactElement, useContext } from 'react'

import { AuthContext } from '../providers/AuthProvider'

const HomeScreen = (): ReactElement => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h5>Home</h5>
      <p>{JSON.stringify(user)}</p>
    </div>
  )
}

export default HomeScreen
