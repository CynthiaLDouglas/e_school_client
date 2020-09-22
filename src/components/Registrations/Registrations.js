import React, { useState, useEffect } from 'react'
import { viewAllReg } from '../../api/registrations'
import { Link, withRouter } from 'react-router-dom'
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
      console.log(user.role_in_school)
      const isTeacher = (user.role_in_school === 'TR')
      return <div key={registration.id}>
        <div className="allregistrations">
          <Container>
            <Row>
              <Col xl={{ span: 12, offset: 3 }}>
                <Card style={{ width: '35rem', margin: '10px', opacity: '100%' }}>
                  <Card.Header as="h5">
                    <Link to={`/registrations/${registration.id}`}>
                    Semester: {registration.semester}
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title> Course:{registration.course_name.name}</Card.Title>
                    <Card.Subtitle>Enrolled: {registration.student_enrolled.first_name}</Card.Subtitle>
                    <Card.Text>
                      <Link to={`/viewregistration/${registration.id}`}>View Reg</Link>
                    </Card.Text>
                    {isTeacher ? (
                      <React.Fragment>
                        {/* Version 2: Work to create, update and delete registrations
                        // <Link to={`/delete-confirm/${registration.id}`}>
                        //   <Button style={{ borderRadius: '25px', margin: '10px' }}>Delete Registration</Button>
                        // </Link>
                        // <Link to={`/update-registration/${registration.id}`}>
                        //   <Button style={{ borderRadius: '25px', margin: '10px' }}>Update Registration</Button>
                        // </Link>
                        */}
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
          {registrationsToRender}
        </div>
      </div>
    )
  }
}

export default withRouter(Registrations)
