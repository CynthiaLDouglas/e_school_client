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
import ShowCourse from '../Routes/ShowCourse'
import RegCreate from '../Registrations/RegCreate'
import Registrations from '../Registrations/Registrations'
import UpdateReg from '../Registrations/UpdateRegistration'
import DeleteReg from '../Registrations/DeleteRegistration'
import ShowReg from '../Registrations/ShowRegistration'
import Homepage from '../Homepage'
import UserProfile from '../UserProfile'

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
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
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
          <AuthenticatedRoute user={user} exact path='/courses' render={() => (
            <Courses msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-course/:id' render={({ match }) => (
            <UpdateCourse msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/delete-confirm/:id' render={({ match }) => (
            <DeleteCourse msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/courses/:id' render={({ match }) => (
            <ShowCourse msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/new-registration' render={() => (
            <RegCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/registrations' render={() => (
            <Registrations msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-reg/:id' render={({ match }) => (
            <UpdateReg msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/delete-reg-confirm/:id' render={({ match }) => (
            <DeleteReg msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/registrations/:id' render={({ match }) => (
            <ShowReg msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/profile' render={() => (
            <UserProfile msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
