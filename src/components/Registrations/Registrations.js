import React, { useState, useEffect } from 'react'
import { viewAllReg } from '../../api/registrations'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
// import Layout from '../shared/Layout'

const Registrations = ({ msgAlert, user, match }) => {
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    viewAllReg(user, registrations)
      .then(res => setRegistrations(res.data.registrations))
      .catch(console.error)
  }, [])

  let registrationsToRender
  if (registrations) {
    registrationsToRender = registrations.map(registration => {
      return <div key={registration.id}>
        <div className="allregistrations">
          <React.Fragment>
            <Container>
              <Row>
                <Col xl={{ span: 12 }}>
                  <Card style={{ width: '35rem', margin: '10px', opacity: '80%' }}>
                    <Card.Body>
                      <Card.Title>Course:{registration.course_name.name}</Card.Title>
                      <Card.Subtitle>Enrolled: {registration.student_enrolled.last_name}, {registration.student_enrolled.first_name}</Card.Subtitle>
                      <Card.Text>Semester: {registration.semester}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        </div>
      </div>
    })
    return (
      <div>
        <div>
          <h1 className="title">Registered Students</h1>
          {registrationsToRender}
        </div>
      </div>
    )
  }
}

export default withRouter(Registrations)
