import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'
import './Navbar.scss'
import { Dropdown, Button } from 'react-bootstrap'

export function Navbar ({ user }) {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  return (
    <Fragment>
      { user ? (
        <nav className="navbar">
          <Link to='/profile' className='navbar-logo'>
        E-School LMS <i className="fas fa-chalkboard"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item nav-links'>
              Logged in: {user.email}
            </li>
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
            <Dropdown>
              <Dropdown.Toggle className="btn user-option-btn" variant='success' id="dropdown-basic">
                Registration
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-option-menu">
                <Dropdown.Item href="#/registrations">View All</Dropdown.Item>
                <Dropdown.Item href="#/new-registration">Register</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle className="btn user-option-btn" variant='success' id="dropdown-basic">
                User Options
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-option-menu">
                <Dropdown.Item href="#/change-password">Change Password</Dropdown.Item>
                <Dropdown.Item href="#/sign-out">Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
                <Button variant='success' className='btn'>Sign-In</Button>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/sign-up' onClick={closeMobileMenu}>
                <Button variant='success' className='btn'>Sign-Up</Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </Fragment>
  )
}

export default Navbar
