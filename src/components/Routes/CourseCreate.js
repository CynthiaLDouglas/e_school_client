import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

// import the api's url
import apiUrl from '../../apiConfig'

// Import axios so we can make HTTP requests
import axios from 'axios'

class CourseCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Add some book state
      course: {
        // set the default title and author to empty strings
        name: '',
        subject: '',
        course_description: ''
      },
      // Initially, the book has not been created, when it has been created, we will
      // keep track of the book's id, so we can redirect to it later
      createdId: null
    }
  }

  /* The handleChange event handler, will update our state, when an input's value changes */
  handleChange = event => {
    // by default react will re-use events after the event handler has finished running
    // the updater function we passed to setState will not be run until after handleChange has finished
    // when react re-uses event's, it sets event.target's properties to `null`
    // to prevent React from nullifying those properties, we call `event.persist`
    event.persist()

    // Updating our state will depend on the previous state, so we use the `updater`
    // callback, to get access to our previous state
    this.setState(prevState => {
      // Create an object that represents the change in state
      // event.target.name refers to the input that has changed's name, ex. 'title'
      // the new value, will come from `event.target.value`
      // ex. { title: 1984 }
      const updatedField = { [event.target.name]: event.target.value }

      // copy all of the book's properties onto the newly created object ({})
      // then copy the updated field onto that new object
      const editedCourse = Object.assign({}, prevState.course, updatedField)

      console.log('updatedField is', updatedField)
      console.log('editedCourse is', editedCourse)

      // return the state change, of setting the `book` state to its new value of
      // `editedBook`
      return { course: editedCourse }
    })
  }

  handleSubmit = event => {
    // prevent the page from refreshing
    event.preventDefault()

    create({
      url: `${apiUrl}/admin/api/course/`,
      method: 'POST',
      // send the new value for our book, which comes from `this.state`
      data: { course: this.state.course }
    })
      // if we succesfully created the book, set the `createdId` state to the id
      // of the book we got back in the response's data
      .then(res => this.setState({ createdId: res.data.course._id }))
      .catch(console.error)
  }

  render () {
    // destructure book to show in the form below, and createdId to redirect
    const { course, createdId } = this.state
    const { handleChange, handleSubmit } = this

    // when the user hits submit to finish editing the book
    if (createdId) {
      // redirect to the show page (route)
      return <Redirect to={`/courses/${createdId}`} />
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          placeholder='Enter a name'
          /* This input's value, will always be book.title */
          value={course.name}
          /* We need to add a name prop, so this input will be properly updated
             in the future w/ handleChange */
          name='name'
          /* Add a change event handler, that will updated our book's state */
          onChange={handleChange}
        />

        <label>Subject</label>
        <input
          placeholder='Enter subject'
          /* This input's value, will always be book.author */
          value={course.subject}
          /* We need to add a name prop, so this input will be properly updated
             in the future w/ handleChange */
          name='subject'
          /* Add a change event handler, that will updated our book's state */
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          placeholder='Enter course description'
          /* This input's value, will always be book.author */
          value={course.course_description}
          /* We need to add a name prop, so this input will be properly updated
             in the future w/ handleChange */
          name='course_description'
          /* Add a change event handler, that will updated our book's state */
          onChange={handleChange}
        />

        <button type='submit'>Submit</button>
        {/* Link the cancel button to the home page route */}
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>

    )
  }
}

export default CourseCreate
