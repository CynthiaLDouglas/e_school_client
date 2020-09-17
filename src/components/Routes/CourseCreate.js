// Code for creating a course and displaying the Form on React.js client

import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { createCourse } from '../../api/courses'
import messages from '../AutoDismissAlert/messages'

const CourseCreate = ({ msgAlert, user }) => {
  const [course, setCourse] = useState({ name: '', subject: '', course_description: '' })
  const [createdCourseId, setCreatedCourseId] = useState(null)

  const handleChange = event => {
    event.persist()
    setCourse(prevCourse => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedCourse = Object.assign({}, prevCourse, updatedField)
      return editedCourse
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    createCourse(user, course)
      .then(res => setCreatedCourseId(res.data.course._id))
      .then(() => msgAlert({
        heading: 'Create Course Success',
        message: messages.createCourseSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Create Course: ',
        message: messages.createCourseFailure,
        variant: 'danger'
      }))
  }

  if (createdCourseId) {
    return <Redirect to='/courses/' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create New Course</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlid="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              name="name"
              value={course.name}
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Dropdown
            onSubmit={handleSubmit}
          >
            <Dropdown.Toggle
              id="dropdown-basic-button"
              controlid="subject"
              type="subject"
              name="subject"
              value={course.subject}>
            Choose a Subject
            </Dropdown.Toggle>
            <Dropdown.Menu onSelect={handleChange}>
              <Dropdown.Item eventKey='English'>English</Dropdown.Item>
              <Dropdown.Item eventKey='Humanities'>Humanities</Dropdown.Item>
              <Dropdown.Item eventKey='Math'>Math</Dropdown.Item>
              <Dropdown.Item eventKey='Science'>Science</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <label>Course Description</label>
          <InputGroup controlid="course_description">
            <Form.Control
              as="textarea"
              required
              name="course_description"
              value={course.course_description}
              type="text"
              placeholder="Enter Course Description"
              rows="5"
              onChange={handleChange}
            />
          </InputGroup>
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CourseCreate
