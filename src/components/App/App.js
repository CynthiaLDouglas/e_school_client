import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Navbar from '../Header/Navbar'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CourseCreate from '../Routes/CourseCreate'
import Courses from '../Routes/Courses'
import UpdateCourse from '../Routes/UpdateCourse'
import DeleteCourse from '../Routes/DeleteCourse'
// import Homepage from '../Homepage'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Navbar user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          {/* <Route path='/' component={Homepage}/> */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/new-course' render={() => (
            <CourseCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/courses' render={() => (
            <Courses msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/viewcourse' render={() => (
            <Courses msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-course/:id' render={({ match }) => (
            <UpdateCourse msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/delete-confirm/:id' render={({ match }) => (
            <DeleteCourse msgAlert={this.msgAlert} user={user} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
