import './Navbar.css'
import dodo from '../assets/dodo.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { ThemeSelector } from './ThemeSelector'
import { useThemeContext } from '../context/ThemeContext'
import { useHover } from '../utils/useHover'

const Navbar = () => {
  const { isPending, logout } = useLogout()

  const { user } = useAuthContext()
  const { color } = useThemeContext()
  const { hoverHandler, removeHoverHandler } = useHover(color)
  const btnStyles = {
    border: `1px solid ${color}`,
  }

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={dodo} alt='dodo-logo' />
          <span>The Dodo</span>
        </li>

        {user && <ThemeSelector />}
        {!user && (
          <>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='signup'>signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {
              <button
                className='btn'
                style={btnStyles}
                onClick={logout}
                onMouseOver={(e) => {
                  hoverHandler(e)
                }}
                onMouseLeave={(e) => removeHoverHandler(e)}
                disabled={isPending}
              >
                {isPending ? 'Logging Out..' : 'LogOut'}
              </button>
            }
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar
