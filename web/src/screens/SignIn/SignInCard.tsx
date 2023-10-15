import { ReactElement, useCallback, useContext } from 'react'
import { Button, Card } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../providers/AuthProvider'

interface Props {
  className?: string
}

const SignInCard = (props: Props): ReactElement => {
  const { className } = props

  const navigate = useNavigate()

  const { signInGoogle } = useContext(AuthContext)

  const onSignInGoogleButtonClick = useCallback(async () => {
    try {
      await signInGoogle()
      navigate('/home')
    } catch (e) {
      // TODO: Handle Sign In Error
      console.error(e)
    }
  }, [navigate, signInGoogle])

  return (
    <Card className={className}>
      <h5>Sign In</h5>
      <Button onClick={onSignInGoogleButtonClick} color="light">
        Sign In with Google
      </Button>
    </Card>
  )
}

export default SignInCard
