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
              <Col lg={{ span: 12, offset: 3 }}>
                <Card border="success" style={{ width: '35rem', margin: '10px', opacity: '750%' }}>
                  <Card.Body>
                    <Card.Title>
                        Course: {course.name}
                    </Card.Title>
                    <Card.Text>
                      Professor:{course.owner.first_name} {course.owner.last_name}
                      <br />
                      Subject: {course.subject}


                    </Card.Text>
                    {isSameUser ? (
                      <React.Fragment>
                        <Link to={`/update-course/${course.id}`}>
                          <Button variant="success">Update Course</Button>
                        </Link>
                        <Link to={`/delete-confirm/${course.id}`}>
                          <Button variant="success">Delete Course</Button>
                        </Link>
                      </React.Fragment>
                    ) : '' }
                    <Link to={`/courses/${course.id}`}>
                      See Description...
                      <br /> Course ID: {course.id}
                    </Link>
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
