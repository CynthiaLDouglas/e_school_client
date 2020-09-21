import apiUrl from '../apiConfig'
import axios from 'axios'

export const createReg = (user, registration) => {
  console.log(user, registration)
  return axios({
    method: 'POST',
    url: apiUrl + '/registrations/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      registrations: {
        course_name: registration.name,
        student_enrolled: registration.studentEnrolled
      }
    }
  })
}

export const allCourses = (user, owner) => {
  return axios({
    url: apiUrl + '/courses/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showCourse = (user, course, id) => {
  return axios({
    url: apiUrl + `/courses/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateCourse = (user, course, id) => {
  return axios({
    url: apiUrl + `/registrations/${id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { registration }
  })
}

export const destroyRegistration = (user, registration, id) => {
  return axios({
    url: apiUrl + `/registrations/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
