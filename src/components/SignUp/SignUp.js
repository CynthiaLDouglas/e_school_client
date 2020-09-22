import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      roleInSchool: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'primary'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({
          email: '',
          firstName: '',
          lastName: '',
          roleInSchool: '',
          password: '',
          passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'warning'
        })
      })
  }

  render () {
    const { email, firstName, lastName, roleInSchool, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3 className='title'>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlid="email">
              <Form.Label className="bigger-font">Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlid="firstName">
              <Form.Label className="bigger-font">First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Enter your First Name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlid="lastName">
              <Form.Label className="bigger-font">Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Enter your last_name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlid="roleInSchool">
              <Form.Label className="bigger-font">Role</Form.Label>
              <Form.Control
                required
                type="text"
                name="roleInSchool"
                value={roleInSchool}
                placeholder="TR for Teacher, ST for Student"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlid="password">
              <Form.Label className="bigger-font">Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlid="passwordConfirmation">
              <Form.Label className="bigger-font">Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
