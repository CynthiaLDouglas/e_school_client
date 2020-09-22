import React, { useState, useEffect } from 'react'
import { showCourse } from '../../api/courses'
import { Link, Redirect } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

const ShowCourse = ({ user, match }) => {
  const [course, setCourse] = useState({ name: '', subject: '', course_description: '' })

  useEffect(() => {
    showCourse(user, match.params.id)
      .then(res => setCourse(res.data.course))
      .catch(console.error)
  }, [])

  if (!course) {
    return (
      <Redirect to= {{
        pathname: '/courses'
      }} />
    )
  }

  return (
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <div className="row">
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '35rem', margin: '10px', opacity: '100%' }}>
                <Card.Body>
                  <Card.Title as="h5">
                    Course: {course.name}
                  </Card.Title>
                  <Card.Subtitle>Subject: {course.subject}</Card.Subtitle>
                  <Card.Text>
                    Course Description: <br />{course.course_description}
                    <Link to={`/viewcourse/${course.id}`}></Link>
                  </Card.Text>
                  <React.Fragment>
                    <Link to='/courses'>
                      <Button variant='success' className="btn">Back to Courses</Button>
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

export default ShowCourse
