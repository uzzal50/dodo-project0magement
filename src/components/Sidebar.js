import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard.svg'
import AddIcon from '../assets/create.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import Bars from '../assets/vars.svg'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

const Sidebar = () => {
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const sidebarHandler = () => setIsOpen(!isOpen)
  const animation = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: 'auto',
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className='sidebar'
      animate={{ width: isOpen ? '250px' : '70px' }}
      transition={{
        type: 'spring',
        damping: 15,
      }}
    >
      <div className='sidebar-content'>
        <div className='user'>
          {/* avatar & username here later */}
          <div>
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  variants={animation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                >
                  Hey {user.displayName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <img
            src={Bars}
            alt='bars'
            className='bars'
            onClick={sidebarHandler}
          />
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={DashboardIcon} alt='dashboard icon' />
                <AnimatePresence>
                  {isOpen && (
                    <Tippy content='Dashboard'>
                      <motion.span
                        variants={animation}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                      >
                        Dashboard
                      </motion.span>
                    </Tippy>
                  )}
                </AnimatePresence>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='add project icon' />
                <AnimatePresence>
                  {isOpen && (
                    <Tippy content='New Project'>
                      <motion.span
                        variants={animation}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        data-for
                        data-tip='Add Project'
                      >
                        New Project
                      </motion.span>
                    </Tippy>
                  )}
                </AnimatePresence>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </motion.div>
  )
}

export default Sidebar
