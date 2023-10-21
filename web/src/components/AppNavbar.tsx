import { ReactElement, useCallback, useContext } from 'react'
import { Button, Navbar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'

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
      <Link to={paths.Home}>
        <Navbar.Brand>
          <img src="/icon.svg" className="mr-3 h-12" alt="Vite Logo" />
          <span className="whitespace-nowrap text-xl font-semibold">
            Investment Tools
          </span>
        </Navbar.Brand>
      </Link>
      <div className="flex md:order-2">
        {user && <Button onClick={onSignOutButtonClick}>Sign Out</Button>}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {user && (
          <Link to={paths.Home}>
            <Navbar.Link active={location.pathname === paths.Home}>
              Home
            </Navbar.Link>
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar
