import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
// import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import { updateCourse, showCourse } from '../../api/courses'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'

const options = [
  { value: 'Math', label: 'Math' },
  { value: 'English', label: 'English' },
  { value: 'Science', label: 'Science' },
  { value: 'Humanities', label: 'Humanities' }
]

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

  const selectChange = el => {
    setCourse(prevCourse => {
      const updatedField = { 'subject': el.value }
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
            <Form.Label className="bigger-font">Course Name: {course.name}</Form.Label>
            <Form.Control
              value={course.name}
              name="name"
              onChange={handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Label className="bigger-font">Subject: {course.subject}</Form.Label>
          <Select
            width='20%'
            options={options}
            onChange={selectChange}
          />
          <br />
          <Form.Group controlId="course_description">
            <Form.Label className="bigger-font">Course Description</Form.Label>
            <Form.Control
              as="textarea"
              value={course.course_description}
              name="course_description"
              onChange={handleChange}
              type="text"
              rows="4"
            /><br />
          </Form.Group>
          <Button variant='success' className="btn" type="submit">Update</Button>
          <Link to='/courses'>
            <Button variant='success' lassName="btn">Cancel</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(UpdateCourse)
