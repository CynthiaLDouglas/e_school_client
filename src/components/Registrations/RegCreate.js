// Code for creating a registration and displaying the Form on React.js client

import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { createReg } from '../../api/registrations'
import messages from '../AutoDismissAlert/messages'

const RegistrationCreate = ({ msgAlert, user }) => {
  const [registration, setRegistration] = useState({ semester: '', name: '', studentEnrolled: '' })
  const [createdRegistrationId, setCreatedRegistrationId] = useState(null)

  const handleChange = event => {
    event.persist()
    setRegistration(prevRegistration => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedRegistration = Object.assign({}, prevRegistration, updatedField)
      return editedRegistration
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    createReg(user, registration)
      .then(res => setCreatedRegistrationId(res.data.registration._id))
      .then(() => msgAlert({
        heading: 'Create Registration Success',
        message: messages.createRegSuccess,
        variant: 'primary'
      }))
      .then(setRegistration({ semester: '', name: '', studentEnrolled: '' }))
      .catch(() => msgAlert({
        heading: 'Failed To Create Registration: ',
        message: messages.createRegFailure,
        variant: 'warning'
      }))
  }

  if (createdRegistrationId) {
    return <Redirect to='/registrations' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3 className="title">Create New Registration</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlid="semester">
            <Form.Label className="bigger-font">Semester</Form.Label>
            <Form.Control
              required
              type="text"
              name="semester"
              value={registration.semester}
              placeholder="Enter Semester"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlid="name">
            <Form.Label className="bigger-font">Course ID</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={registration.name}
              placeholder="Enter Course ID"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlid="studentEnrolled">
            <Form.Label className="bigger-font">Student</Form.Label>
            <InputGroup controlid="student_enrolled">
              <Form.Control
                required
                type="text"
                name="studentEnrolled"
                value={registration.studentEnrolled}
                placeholder="Enter Student ID"
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Button variant='success' className="btn"type="submit">
              Submit
          </Button>
          <Link to='/registrations'>
            <Button variant='success' className="btn">Back to Registrations</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default RegistrationCreate
