import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showCourse, destroyCourse } from '../../api/courses'
import Button from 'react-bootstrap/Button'

const DeleteCourse = ({ msgAlert, user, match }) => {
  const [course, setCourse] = useState({ name: '', subject: '', course_description: '' })
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    showCourse(user, course, match.params.id)
      .then(res => setCourse(res.data.courses))
      .catch(console.error)
  }, [deleted])

  const handleSubmit = event => {
    event.preventDefault()
    destroyCourse(user, course, match.params.id)
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Delete Course Success',
        message: messages.deleteCourseSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Delete Course Failure',
        message: messages.deleteCourseFailure,
        variant: 'danger'
      }))
  }

  if (deleted) {
    return <Redirect to='/courses' />
  }

  return (
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
    Are you sure? <br />
      <Button style={{ borderRadius: '25px', margin: '10px' }} onClick={handleSubmit}>Delete Course</Button>
      <Link to='/courses'>
        <Button style={{ borderRadius: '25px', margin: '10px' }}>Back to Courses</Button>
      </Link>
    </div>
  )
}

export default withRouter(DeleteCourse)
