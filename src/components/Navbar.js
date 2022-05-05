import React, { useState } from 'react'
import './Navbar.css'
import dodo from '../assets/dodo.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { isPending, logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={dodo} alt='dodo-logo' />
          <span>The Dodo</span>
        </li>
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
            {!isPending && (
              <button className='btn' onClick={logout}>
                LogOut
              </button>
            )}
            {isPending && (
              <button className='btn' disabled>
                logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar
