import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
// import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import { updateCourse, showCourse } from '../../api/courses'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { SubjectItems } from './SubjectItems'
import Select from 'react-select'

const UpdateCourse = ({ msgAlert, user, match }) => {
  const [course, setCourse] = useState({ name: '', subject: '', course_description: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showCourse(user, course, match.params.id)
      .then(res => setCourse(res.data.course))
      .catch(console.error)
  }, [])

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
    updateCourse(user, course, match.params.id)
      .then(() => setUpdated({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Course Success',
        message: messages.updateCourseSuccess,
        variant: 'primary'
      }))
      .then(setCourse({ name: '', subject: '', course_description: '' }))
      .catch(() => msgAlert({
        heading: 'Failed To Update Course',
        message: messages.updateCourseFailure,
        variant: 'warning'
      }))
  }

  if (updated) {
    return <Redirect to='/courses' />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              value={course.name}
              name="name"
              onChange={handleChange}
              type="text"
            /><br />
          </Form.Group>
          <Select
            width='200px'
            enuColor='red'
            Options={SubjectItems}
          />
          <Form.Group controlId="course_description">
            <label>Content</label>
            <Form.Control
              as="textarea"
              value={course.course_description}
              name="course_description"
              onChange={handleChange}
              type="text"
              rows="4"
            /><br />
          </Form.Group>
          <Button style={{ borderRadius: '25px', margin: '10px' }} type="submit">Update</Button>
          <Link to='/courses'>
            <Button style={{ borderRadius: '25px', margin: '10px' }}>Cancel</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(UpdateCourse)
