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
              <Card style={{ backgroundColor: '#31343a', width: '35rem', margin: '10px', opacity: '%' }}>
                <Card.Body>
                  <Card.Text>
                    <b className="bigger-font">Course:</b> <span style={{ color: '#d8e4d4' }}>{course.name}</span>
                  </Card.Text>
                  <Card.Text>
                    <b className="bigger-font">Course Description:</b><br /><span style={{ color: '#d8e4d4' }}>{course.course_description}</span>
                  </Card.Text>
                  <br />
                  <Card.Text><b className="bigger-font">Subject:</b> <span style={{ color: '#d8e4d4' }}>{course.subject}</span></Card.Text>
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
