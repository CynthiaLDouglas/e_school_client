import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import { updatePost, showPost } from '../../api/devpost'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdatePost = ({ msgAlert, user, match }) => {
  const [devpost, setDevpost] = useState({ title: '', subject: '', content: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showPost(user, devpost, match.params.id)
      .then(res => setDevpost(res.data.devpost))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setDevpost(prevDevpost => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevDevpost, updatedField)
      return editedPost
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updatePost(user, devpost, match.params.id)
      .then(() => setUpdated({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Post Success',
        message: messages.updatePostSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Update Post',
        message: messages.updatePostFailure,
        variant: 'danger'
      }))
  }

  if (updated) {
    return <Redirect to='/all-courses' />
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                value={course.name}
                name="name"
                onChange={handleChange}
                type="text"
              /><br />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={course.subject}
                name="subject"
                onChange={handleChange}
                type="text"
              /><br />
            </Form.Group>
            <Form.Group controlId="course_description">
              <label>Content</label>
              <Form.Control
                as="textarea"
                value={course.course_description}
                name="course_description"
                onChange={handleChange}
                type="text"
                rows="4"
              /><br />
            </Form.Group>
            <Button style={{ borderRadius: '25px', margin: '10px' }} type="submit">Update</Button>
            <Link to='/'>
              <Button style={{ borderRadius: '25px', margin: '10px' }}>Cancel</Button>
            </Link>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(UpdateCourse)
