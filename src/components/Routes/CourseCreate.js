// Code for creating a course and displaying the Form on React.js client

import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { createCourse } from '../../api/courses'
import messages from '../AutoDismissAlert/messages'
import Select from 'react-select'

const options = [
  { value: 'Math', label: 'Math' },
  { value: 'English', label: 'English' },
  { value: 'Science', label: 'Science' },
  { value: 'Humanities', label: 'Humanities' }
]

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

  const selectChange = el => {
    console.log(el.value)
    setCourse(prevCourse => {
      const updatedField = { 'subject': el.value }
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
        variant: 'primary'
      }))
      .then(setCourse({ name: '', subject: '', course_description: '' }))
      .catch(() => msgAlert({
        heading: 'Failed To Create Course: ',
        message: messages.createCourseFailure,
        variant: 'warning'
      }))
  }

  if (createdCourseId) {
    return <Redirect to='/courses' />
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
              type="text"
              name="name"
              value={course.name}
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Select
            width='20%'
            options={options}
            onChange={selectChange}
          />
          <Form.Group controlid="course_description">
            <Form.Label>Course Description</Form.Label>
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
          </Form.Group>
          <Button type="submit">
              Submit
          </Button>
          <Link to='/courses'>
            <Button style={{ borderRadius: '25px', margin: '10px' }}>Back to Courses</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default CourseCreate
