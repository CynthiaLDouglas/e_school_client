import React, { useState, useEffect } from 'react'
import { allCourses } from '../../api/courses'
import { Link, withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
// import Layout from '../shared/Layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Courses = ({ msgAlert, user, match }) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    allCourses(user, courses)
      .then(res => setCourses(res.data.courses))
      .catch(console.error)
  }, [])

  let coursesToRender
  if (courses) {
    coursesToRender = courses.map(course => {
      const isSameUser = (user.id === course.owner.id)
      return <div key={course.id}>
        <div className="allcourses">
          <Container>
            <Row>
              <Col xl={{ span: 12, offset: 3 }}>
                <Card style={{ width: '35rem', margin: '10px', opacity: '100%' }}>
                  <Card.Header as="h5">
                    <Link to={`/courses/${course.id}`}>
                    Course: {course.name}
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title> Taught By:{course.owner.first_name} {course.owner.last_name}</Card.Title>
                    <Card.Subtitle>Subject: {course.subject}</Card.Subtitle>
                    <Card.Text>
                      Course Description: <br />{course.course_description}
                      <Link to={`/viewcourse/${course.id}`}></Link>
                    </Card.Text>
                    {isSameUser ? (
                      <React.Fragment>
                        <Link to={`/delete-confirm/${course.id}`}>

                          <Button style={{ borderRadius: '25px', margin: '10px' }}>Delete Course</Button>
                        </Link>
                        <Link to={`/update-course/${course.id}`}>
                          <Button style={{ borderRadius: '25px', margin: '10px' }}>Update Course</Button>
                        </Link>
                      </React.Fragment>
                    ) : '' }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    })
    return (
      <div>
        <div>
          {coursesToRender}
        </div>
      </div>
    )
  }
}

export default withRouter(Courses)
