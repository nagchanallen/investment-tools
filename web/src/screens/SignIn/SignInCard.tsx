import { ReactElement } from 'react'
import { Button, Card } from 'flowbite-react'

interface Props {
  className?: string
  signInGoogle: () => Promise<void>
}

const SignInCard = (props: Props): ReactElement => {
  const { className, signInGoogle } = props

  return (
    <Card className={className}>
      <h5>Sign In</h5>
      <Button onClick={signInGoogle} color="light">
        Sign In with Google
      </Button>
    </Card>
  )
}

export default SignInCard
