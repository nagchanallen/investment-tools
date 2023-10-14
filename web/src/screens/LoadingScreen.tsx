import { ReactElement } from 'react'

const LoadingScreen = (): ReactElement => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <p>Loading...</p>
    </div>
  )
}

export default LoadingScreen
