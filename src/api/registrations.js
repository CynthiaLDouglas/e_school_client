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
      registration: {
        semester: registration.semester,
        course_name: registration.name,
        student_enrolled: registration.studentEnrolled
      }
    }
  })
}

export const viewAllReg = (user, owner) => {
  return axios({
    url: apiUrl + '/registrations/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const viewOneReg = (user, course, id) => {
  return axios({
    url: apiUrl + `/registrations/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateReg = (user, course, id) => {
  return axios({
    url: apiUrl + `/registrations/${id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { registration }
  })
}

export const deleteReg = (user, registration, id) => {
  return axios({
    url: apiUrl + `/registrations/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
