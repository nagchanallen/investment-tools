import { useEffect, ReactElement } from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorScreen = (): ReactElement => {
  const error = useRouteError()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  )
}

export default ErrorScreen
