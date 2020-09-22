import React, { Fragment } from 'react'
import { Figure } from 'react-bootstrap'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Layout from '../shared/Layout'

const UserProfile = props => {
  // const backgroundImageUrl = 'https://i.imgur.com/X3qo3Y7.jpg'
  //
  // const profileHeader = {
  //   color: 'white',
  //   backgroundImage: `url(${backgroundImageUrl})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: '75% 75%',
  //   height: '50vh',
  //   width: '100%',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: '10px'
  // }
  //
  // const userCourses = {
  //   color: 'black',
  //   height: '100vh',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start'
  // }
  // //

  return (
    <Fragment>
      <div>
        <Figure>
          <Figure.Image
            style={{ opacity: '0.85' }}
            alt="Chalkboard reading: Success. Go Get it..."
            src="https://i.imgur.com/uT6q6XU.jpg"
          />
        </Figure>
      </div>
    </Fragment>
  )
}

export default UserProfile
