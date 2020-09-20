import React, { useState, useEffect } from 'react'
import { allCourses } from '../../api/courses'
import { Link, withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
// import Layout from '../shared/Layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Courses = ({ msgAlert, user, match }) => {
  const [courses, setCourses] = useState([])
  // const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    allCourses(user, courses)
      .then(res => setCourses(res.data.courses))
      .catch(console.error)
  }, [])

  // const destroy = (id) => {
  //   axios({
  //     url: apiUrl + `/courses/${id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token ${user.token}`
  //     }
  //   })
  //     .then(() => setDeleted(id))
  //     .then(() => msgAlert({
  //       heading: 'Delete Course Success',
  //       message: messages.deleteCourseSuccess,
  //       variant: 'success'
  //     }))
  //     .catch(() => msgAlert({
  //       heading: 'Delete Course Failure',
  //       message: messages.deleteCourseFailure,
  //       variant: 'danger'
  //     }))
  // }

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
                  <Card.Header as="h5">Course: {course.name}</Card.Header>
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
