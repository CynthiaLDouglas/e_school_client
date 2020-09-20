// import React, { useState } from 'react'
// import { Button } from './Button'
// import { Link } from 'react-router-dom'
// import './Navbar.css'
// import Dropdown from './dropdown'

// import React, { Fragment } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
//
// const authenticatedOptions = (
//   <Fragment>
//     <Nav>
//       <Nav.Link href="#new-course">New Course</Nav.Link>
//       <Nav.Link href="#courses">Course List</Nav.Link>
//
//       <Nav.Link href="#sign-out">Sign Out</Nav.Link>
//     </Nav>
//   </Fragment>
// )
//
// const unauthenticatedOptions = (
//   <Fragment>
//     <Nav.Link href="#sign-up">Sign Up</Nav.Link>
//     <Nav.Link href="#sign-in">Sign In</Nav.Link>
//   </Fragment>
// )
//
// // const teacherOptions = (
// //   <Fragment>
// //     <Nav.Link href="#courses">Course List</Nav.Link>
// //     <Nav.Link href="#change-password">Change Password</Nav.Link>
// //     <Nav.Link href="#sign-out">Sign Out</Nav.Link>
// //   </Fragment>
// // )
//
// const Header = ({ user }) => (
//   <Navbar className="navbar" variant="dark" expand="md">
//     <Navbar.Brand href="#">
//       E-School LMS { user && <span className="navbar-text mr-2">Logged in user: {user.email}</span>}
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="ml-auto">
//         { user ? authenticatedOptions : unauthenticatedOptions }
//       </Nav>
//     </Navbar.Collapse>
//   </Navbar>
// )
//
// // {
// //   (user.roleInSchool === 'tr')
// //     ? teacherOptions
// //     : authenticatedOptions
// // }
//
// export default Header
