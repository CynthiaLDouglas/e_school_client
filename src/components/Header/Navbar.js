import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import './Button.css'
import './Navbar.css'
import Dropdown from './Dropdown'

export function Navbar ({ user }) {
  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const onHoverEnter = () => {
    console.log(window.innerWidth)
    if (window.innerWidth < 1200) {
      setDropdown(true)
    } else {
      setDropdown(false)
    }
  }

  // const onHoverLeave = () => {
  //   if (window.innerWidth < 1200) {
  //     setDropdown(false)
  //   } else {
  //     setDropdown(false)
  //   }
  // }

  return (
    <Fragment>
      { user ? (
        <nav className="navbar">
          <Link to='/' className='navbar-logo'>
        E-School LMS <i className="fas fa-chalkboard"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/courses' className='nav-links' onClick={closeMobileMenu}>
            See Courses
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/new-course' className='nav-links' onClick={closeMobileMenu}>
            New Course
              </Link>
            </li>
            <li
              className='nav-item'
              onMouseEnter={onHoverEnter}
              // onMouseLeave={onHoverLeave}
            >
              <Link to='/'
                className='nav-links'
                onClick={closeMobileMenu}>
            Options <i className='fas fa-caret-down' />
              </Link>
              {dropdown && <Dropdown />}
            </li>
            <li className='nav-item'>
              <Link to='/change-password' className='nav-links' onClick={closeMobileMenu}>
            Change Password
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/sign-out' className='nav-links' onClick={closeMobileMenu}>
            Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar">
          <Link to='/' className='navbar-logo'>
        E-School LMS <i className="fas fa-chalkboard"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/sign-in' onClick={closeMobileMenu}>
                <button className='btn'>Sign-In</button>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/sign-up' onClick={closeMobileMenu}>
                <button className='btn'>Sign-Up</button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </Fragment>
  )
}

export default Navbar
