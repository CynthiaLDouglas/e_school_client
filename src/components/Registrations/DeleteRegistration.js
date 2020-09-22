import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showCourse, destroyCourse } from '../../api/courses'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

const DeleteCourse = ({ msgAlert, user, match }) => {
  const [course, setCourse] = useState({ name: '', subject: '', course_description: '' })
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    showCourse(user, match.params.id)
      .then(res => setCourse(res.data.course))
      .catch(console.error)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    destroyCourse(user, match.params.id)
      .then(() => setDeleted(true))
      .then(() => msgAlert({
        heading: 'Delete Course Success',
        message: messages.deleteCourseSuccess,
        variant: 'primary'
      }))
      .catch(() => msgAlert({
        heading: 'Delete Course Failure',
        message: messages.deleteCourseFailure,
        variant: 'warning'
      }))
  }

  if (deleted) {
    return <Redirect to='/courses' />
  }

  if (course) {
    return (
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className="row">
          <Container>
            <Row>
              <Col xl={{ span: 12, offset: 3 }}>
                <Card style={{ width: '35rem', margin: '10px', opacity: '100%' }}>
                  <Card.Header> Are you sure you would like to delete?</Card.Header>
                  <Card.Body>
                    <Card.Title as="h5">
                      <Link to={`/courses/${course.id}`}>
                      Course: {course.name}
                      </Link>
                    </Card.Title>
                    <Card.Subtitle>Subject: {course.subject}</Card.Subtitle>
                    <Card.Text>
                      Course Description: <br />{course.course_description}
                      <Link to={`/viewcourse/${course.id}`}></Link>
                    </Card.Text>
                    <React.Fragment>
                      <Button variant='success' style={{ borderRadius: '25px', margin: '10px' }} onClick={handleSubmit}>Delete Course</Button>
                      <Link to='/courses'>
                        <Button variant='success' style={{ borderRadius: '25px', margin: '10px' }}>Back to Courses</Button>
                      </Link>
                    </React.Fragment>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default withRouter(DeleteCourse)
