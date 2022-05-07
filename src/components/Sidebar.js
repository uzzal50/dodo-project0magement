import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard.svg'
import AddIcon from '../assets/create.svg'
import Mode from '../assets/mode.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import Bars from '../assets/vars.svg'
import Tippy from '@tippyjs/react'
import { useThemeContext } from '../context/ThemeContext'

const Sidebar = () => {
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)
  const sidebarHandler = () => setIsOpen(!isOpen)

  const { color, mode, changeMode } = useThemeContext()
  const sidebarContentRef = useRef(null)
  const sidebarContainerRef = useRef(null)

  useEffect(() => {
    let sidebarContentWidth =
      sidebarContentRef.current &&
      sidebarContentRef.current.getBoundingClientRect().width

    if (isOpen) {
      sidebarContainerRef.current.style.width = `${sidebarContentWidth}px`
    } else {
      sidebarContainerRef.current.style.width = `${sidebarContentWidth}px`
    }
  }, [isOpen])

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
    <>
      <motion.div
        className='sidebar'
        ref={sidebarContainerRef}
        style={{ backgroundColor: color }}
        animate={{ width: isOpen ? '250px' : '80px' }}
        transition={{
          type: 'spring',
          damping: 15,
        }}
      >
        <div className='sidebar-content' ref={sidebarContentRef}>
          <div className='user'>
            {/* avatar & username here later */}
            <div>
              <AnimatePresence>
                {isOpen && (
                  <motion.h4
                    variants={animation}
                    initial='hidden'
                    animate='show'
                    exit='hidden'
                  >
                    Hey {user.displayName}
                  </motion.h4>
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
        <div className='mode-container'>
          <div></div>
          <img
            className='mode'
            src={Mode}
            alt='mode'
            style={{
              filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)',
            }}
            onClick={() => changeMode(mode === 'light' ? 'dark' : 'light')}
          />
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar
