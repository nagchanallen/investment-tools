import { ReactElement, useCallback, useContext } from 'react'
import { Button, Navbar } from 'flowbite-react'
import { useLocation } from 'react-router-dom'

import { paths } from '../paths'
import { AuthContext } from '../providers/AuthProvider'
import useErrorDialog from '../hooks/useErrorDialog'

const AppNavbar = (): ReactElement => {
  const location = useLocation()
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
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href={paths.Home}>
        <img src="/icon.svg" className="mr-3 h-12" alt="Vite Logo" />
        <span className="whitespace-nowrap text-xl font-semibold">
          Investment Tools
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user && <Button onClick={onSignOutButtonClick}>Sign Out</Button>}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {user && (
          <Navbar.Link
            href={paths.Home}
            active={location.pathname === paths.Home}
          >
            Home
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
