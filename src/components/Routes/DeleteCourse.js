import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showCourse, destroyCourse } from '../../api/courses'
import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { Card } from 'react-bootstrap'
// // import Layout from '../shared/Layout'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

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

  // const handleChange = event => {
  //   event.persist()
  //   setCourse(prevCourse => {
  //     const updatedField = { [event.target.name]: event.target.value }
  //     const editedCourse = Object.assign({}, prevCourse, updatedField)
  //     return editedCourse
  //   })
  // }

  if (deleted) {
    return <Redirect to='/courses' />
  }

  // let courseToRender
  // if (course) {
  //   courseToRender = course.map(course => {
  return (
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Button style={{ borderRadius: '25px', margin: '10px' }} onClick={handleSubmit}>Delete Course</Button>
      <Link to='/courses'>
        <Button style={{ borderRadius: '25px', margin: '10px' }}>Back to Courses</Button>
      </Link>
    </div>
  )
}
// return (
//   <div>
//     <div>
//       {courseToRender}
//     </div>
//   </div>
// )

export default withRouter(DeleteCourse)
